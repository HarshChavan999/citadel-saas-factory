"""Planner-Executor-Critic loop with typed task graph and stop-gate.

The planner decomposes a goal into steps, the executor runs each step,
and the critic evaluates the result. If the critic rejects, the planner
revises the plan. Depth and fan-out are capped to prevent runaway costs.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from typing import Any

import structlog

logger = structlog.get_logger("orchestrator.planner")

MAX_REPLANS = 3
MAX_STEPS_PER_PLAN = 10


@dataclass(frozen=True)
class PlannerResult:
    """Immutable result from the planner loop."""

    status: str  # "ok", "max_replans_reached", "model_unavailable"
    output: str = ""
    iterations: int = 1
    steps_executed: int = 0


class PlannerLoop:
    """Plan -> Execute -> Critique loop with stop-gate."""

    def __init__(
        self,
        router: Any,
        tier: str = "reasoning_fast",
        max_replans: int = MAX_REPLANS,
        max_steps: int = MAX_STEPS_PER_PLAN,
    ) -> None:
        self._router = router
        self._tier = tier
        self._max_replans = max_replans
        self._max_steps = max_steps

    async def run(self, goal: str) -> PlannerResult:
        """Execute the planner loop for a goal."""
        plan = await self._create_plan(goal)
        total_steps = 0

        for iteration in range(1, self._max_replans + 2):  # +1 for initial, +1 for range
            # Execute plan steps
            step_results = []
            steps = plan.get("steps", [])[:self._max_steps]

            for step in steps:
                result = await self._execute_step(step)
                step_results.append(result)
                total_steps += 1

            # Critique results
            critique = await self._critique(goal, plan, step_results)

            if critique.get("approved", False):
                logger.info("plan_approved", iteration=iteration, steps=total_steps)
                return PlannerResult(
                    status="ok",
                    output="\n".join(step_results),
                    iterations=iteration,
                    steps_executed=total_steps,
                )

            # Critic rejected — check if we can replan
            if iteration > self._max_replans:
                logger.warning("max_replans_reached", iterations=iteration)
                return PlannerResult(
                    status="max_replans_reached",
                    output="\n".join(step_results),
                    iterations=iteration,
                    steps_executed=total_steps,
                )

            # Revise plan
            revised = critique.get("revised_plan")
            if revised:
                plan = revised
            else:
                plan = await self._create_plan(
                    f"{goal}\n\nPrevious attempt was rejected: {critique.get('reason', 'unknown')}"
                )

            logger.info("plan_revised", iteration=iteration, reason=critique.get("reason"))

        return PlannerResult(
            status="max_replans_reached",
            iterations=self._max_replans + 1,
            steps_executed=total_steps,
        )

    async def _create_plan(self, goal: str) -> dict[str, Any]:
        """Ask the LLM to create a plan for the goal."""
        messages = [
            {
                "role": "user",
                "content": (
                    f"Create a plan to accomplish this goal:\n{goal}\n\n"
                    f"Respond with JSON: "
                    f'{{"steps": [{{"id": "s1", "action": "...", "input": "..."}}]}}'
                ),
            }
        ]
        response = await self._router.complete(tier=self._tier, messages=messages)
        try:
            return json.loads(response.content)
        except (json.JSONDecodeError, TypeError):
            return {"steps": [{"id": "s1", "action": "execute", "input": goal}]}

    async def _execute_step(self, step: dict[str, Any]) -> str:
        """Execute a single plan step via the LLM."""
        messages = [
            {
                "role": "user",
                "content": f"Execute step: {step.get('action', 'unknown')} with input: {step.get('input', '')}",
            }
        ]
        response = await self._router.complete(tier=self._tier, messages=messages)
        return response.content

    async def _critique(
        self, goal: str, plan: dict[str, Any], results: list[str]
    ) -> dict[str, Any]:
        """Ask the critic to evaluate the execution results."""
        messages = [
            {
                "role": "user",
                "content": (
                    f"Critique the following execution against the goal.\n"
                    f"Goal: {goal}\n"
                    f"Plan: {json.dumps(plan)}\n"
                    f"Results: {json.dumps(results)}\n\n"
                    f"Respond with JSON: "
                    f'{{"approved": true/false, "reason": "...", "revised_plan": {{...}} or null}}'
                ),
            }
        ]
        response = await self._router.complete(tier=self._tier, messages=messages)
        try:
            return json.loads(response.content)
        except (json.JSONDecodeError, TypeError):
            return {"approved": True, "reason": "Unable to parse critique, accepting"}
