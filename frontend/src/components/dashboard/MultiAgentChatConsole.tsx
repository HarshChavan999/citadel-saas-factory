import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  ChevronRight, 
  ChevronDown, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Sliders
} from 'lucide-react';
import { ChatMessage, AgentMetadata } from '../../lib/types';
import { PRESET_EXECUTIVE_QUERIES } from '../../lib/mockData';
import { AgentBadge } from '../ui/AgentBadge';
import { MarkdownPreview } from '../ui/MarkdownPreview';

interface MultiAgentChatConsoleProps {
  messages: ChatMessage[];
  agents: AgentMetadata[];
  isLoading?: boolean;
  onSendMessage: (query: string, targetAgentId?: string | null) => void;
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const MultiAgentChatConsole: React.FC<MultiAgentChatConsoleProps> = ({
  messages,
  agents,
  isLoading = false,
  onSendMessage,
  onExecuteAction
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [activeAgentSwitch, setActiveAgentSwitch] = useState<string | null>(null);
  const [expandedReasoningMap, setExpandedReasoningMap] = useState<Record<string, boolean>>({});

  const toggleReasoning = (msgId: string) => {
    setExpandedReasoningMap(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    onSendMessage(inputQuery.trim(), activeAgentSwitch);
    setInputQuery('');
  };

  const selectedAgentMeta = agents.find(a => a.id === activeAgentSwitch);

  return (
    <div className="space-y-6">
      {/* Top Banner with Antigravity IDE Multi-Agent Switcher */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-800 border border-amber-500/20">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              Autonomous Multi-Agent Discussion & Swarm Intelligence
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <span>Collaborative Multi-Agent Workspace</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-mono font-bold border border-indigo-200">
              IDE Style
            </span>
          </h3>
          <p className="text-xs text-stone-600">
            Real-time inter-agent debate and consensus modeling powered by live Gemini 3.7 Flash. Switch active agent focus or let the Swarm auto-orchestrate.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono font-bold shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Engine: Gemini 3.7 Flash (Live Active)</span>
        </div>
      </div>

      {/* Antigravity-Style Agent Switcher Bar */}
      <div className="glass-card p-3.5 rounded-2xl border border-[#e6e4df] bg-[#faf9f5] space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="h-3.5 w-3.5 text-amber-700" />
            <span className="text-xs font-bold text-stone-800 uppercase font-mono tracking-wider">
              Target Agent Context Switch:
            </span>
          </div>
          <span className="text-[11px] font-mono text-stone-500">
            {activeAgentSwitch ? `Focused: ${selectedAgentMeta?.name}` : 'Swarm Mode (Auto-Orchestrated by COO)'}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
          <button
            type="button"
            onClick={() => setActiveAgentSwitch(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition flex items-center gap-1.5 flex-shrink-0 ${
              activeAgentSwitch === null
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-[#e5e3dc] hover:bg-[#f2f0e8]'
            }`}
          >
            <span>⚡ Swarm (All Agents)</span>
          </button>

          {agents.map((ag) => {
            const isSelected = activeAgentSwitch === ag.id;
            return (
              <button
                key={ag.id}
                type="button"
                onClick={() => setActiveAgentSwitch(isSelected ? null : ag.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition flex items-center gap-1.5 flex-shrink-0 ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs ring-2 ring-amber-500/50'
                    : 'bg-white text-stone-700 border border-[#e5e3dc] hover:bg-[#f2f0e8]'
                }`}
              >
                <span>{ag.avatar}</span>
                <span>{ag.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-70">[{ag.id}]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preset Queries Row */}
      <div className="space-y-2">
        <span className="text-xs text-stone-600 font-mono flex items-center gap-1.5 font-bold">
          <Sparkles className="h-3.5 w-3.5 text-amber-700" />
          <span>POPULAR EXECUTIVE DISCUSSIONS:</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_EXECUTIVE_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(preset.query, activeAgentSwitch)}
              className="glass-card p-3.5 rounded-xl text-left border border-[#e6e4df] hover:border-amber-400 hover:bg-[#faf8f5] transition flex items-start gap-2.5 group shadow-xs"
            >
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-800 group-hover:bg-amber-500/20 transition mt-0.5">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
              <div>
                <h5 className="text-xs font-bold text-stone-900 group-hover:text-amber-800 transition">
                  {preset.shortLabel}
                </h5>
                <p className="text-[11px] text-stone-500 line-clamp-1 italic mt-0.5">
                  "{preset.query}"
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream Container */}
      <div className="glass-card rounded-2xl border border-[#e6e4df] p-4 space-y-6 max-h-[640px] overflow-y-auto bg-white shadow-xs">
        {messages.map((msg) => {
          const isReasoningExpanded = expandedReasoningMap[msg.id] !== false; // Default expanded for live discussion view
          return (
            <div key={msg.id} className="space-y-4">
              {/* User Query Bubble */}
              {msg.queryText && (
                <div className="flex justify-end">
                  <div className="max-w-xl p-3.5 rounded-2xl bg-[#f7ede8] text-[#993d1d] font-semibold text-xs leading-relaxed border border-[#ebd3c7] shadow-xs">
                    {msg.queryText}
                  </div>
                </div>
              )}

              {/* Multi-Agent Live Discussion Thread */}
              <div className="glass-card p-5 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e6e4df] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold shadow-xs">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-stone-900 flex items-center gap-2">
                        <span>Decision Support Agent (COO)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono font-bold">
                          Multi-Agent Swarm Consensus
                        </span>
                      </h4>
                      <p className="text-[10px] text-stone-500 font-mono">
                        Participating: {msg.participatingAgents?.join(', ') || 'orchestrator, sales, finance'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">{msg.timestamp}</span>
                </div>

                {/* Live Inter-Agent Discussion Thread (Antigravity IDE Multi-Turn Style) */}
                {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                  <div className="rounded-xl border border-[#e5e3dc] bg-[#fbfaf6] overflow-hidden shadow-2xs">
                    <button
                      onClick={() => toggleReasoning(msg.id)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono text-stone-800 bg-[#f4f2ea] hover:bg-[#edeae0] transition border-b border-[#e5e3dc]"
                    >
                      <div className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-amber-700" />
                        <span className="font-bold text-amber-950">
                          LIVE MULTI-AGENT DISCUSSION & REASONING CHAIN
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200/60 text-amber-900 font-bold">
                          {msg.reasoningSteps.length} agent turns
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                        <span>{isReasoningExpanded ? 'Collapse debate' : 'Expand debate'}</span>
                        {isReasoningExpanded ? <ChevronDown className="h-4 w-4 text-stone-600" /> : <ChevronRight className="h-4 w-4 text-stone-600" />}
                      </div>
                    </button>

                    {isReasoningExpanded && (
                      <div className="p-4 space-y-3 bg-[#faf9f5]">
                        <div className="space-y-3.5">
                          {msg.reasoningSteps.map((step, sIdx) => {
                            const agent = agents.find(a => a.id === step.agentId) || {
                              id: step.agentId,
                              name: step.agentName || 'Agent',
                              role: 'Specialist',
                              avatar: '🤖',
                              color: 'text-stone-800',
                              badgeBg: 'bg-stone-100 text-stone-800',
                              status: 'active'
                            };

                            const isCOO = step.agentId === 'orchestrator';
                            const isSynthesis = step.phase === 'final_synthesis';

                            return (
                              <div 
                                key={sIdx} 
                                className={`p-3.5 rounded-xl border transition-all ${
                                  isSynthesis 
                                    ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400/30'
                                    : isCOO
                                    ? 'bg-white border-[#e6e4df]'
                                    : 'bg-[#f5f4ed] border-[#e2dfd5]'
                                } shadow-2xs`}
                              >
                                {/* Agent Speaker Card Header */}
                                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">{agent.avatar}</span>
                                    <div>
                                      <span className="text-xs font-bold text-stone-900">{step.agentName || agent.name}</span>
                                      <span className="text-[10px] font-mono text-stone-500 ml-2 uppercase font-semibold">
                                        [{step.phase.replace('_', ' ')}]
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-stone-700 border border-[#e5e3dc]">
                                      Turn #{sIdx + 1}
                                    </span>
                                  </div>
                                </div>

                                {/* Agent Thought & Discussion Content rendered in Markdown */}
                                <div className="pt-2">
                                  <MarkdownPreview 
                                    content={step.thought} 
                                    showToggle={false} 
                                    defaultMode="preview"
                                    className="!border-0 !bg-transparent !p-0 shadow-none text-xs"
                                  />
                                </div>

                                {/* Cited Telemetry Badges */}
                                {step.dataCited && step.dataCited.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 pt-2 mt-2 border-t border-stone-200/60">
                                    <span className="text-[10px] font-mono text-stone-500 font-bold uppercase mr-1">
                                      Telemetry Cited:
                                    </span>
                                    {step.dataCited.map((cite, cIdx) => (
                                      <span key={cIdx} className="px-2 py-0.5 rounded-md bg-white border border-[#e2dfd5] text-[10px] font-mono text-stone-700 font-bold">
                                        {cite}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Final Synthesized Consensus Answer */}
                {msg.finalAnswer && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#e6e4df]">
                      <span className="text-xs font-bold uppercase font-mono text-amber-900 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Swarm Consensus & Synthesized Executive Statement:</span>
                      </span>
                    </div>
                    <MarkdownPreview 
                      content={msg.finalAnswer} 
                      showToggle={true}
                      defaultMode="preview"
                      fileName={msg.fileName || (msg.queryText ? `${msg.queryText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32)}.md` : 'executive-decision.md')}
                    />
                  </div>
                )}

                {/* Key Metrics Pill Grid */}
                {msg.keyDataPoints && msg.keyDataPoints.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e6e4df]">
                    {msg.keyDataPoints.map((dp, dIdx) => (
                      <div key={dIdx} className="px-3 py-1 rounded-lg bg-[#f3f2ec] border border-[#e5e3dc] text-[11px]">
                        <span className="text-stone-600">{dp.label}: </span>
                        <span className="font-bold font-mono text-amber-900">{dp.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Executive Action Triggers */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-3 border-t border-[#e6e4df]">
                    {msg.suggestedActions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => {
                          if (act.actionType === 'query' && act.payload?.query) {
                            onSendMessage(act.payload.query, activeAgentSwitch);
                          } else {
                            onExecuteAction(act.actionType, act.payload);
                          }
                        }}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#d97757] hover:bg-[#c25e3f] text-white transition shadow-xs"
                      >
                        <span>{act.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Live Gemini Swarm Thinking Indicator with Discussion Animation */}
        {isLoading && (
          <div className="flex gap-3.5 p-4 rounded-2xl bg-white border border-amber-500/30 shadow-xs animate-pulse">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center text-white shadow-2xs flex-shrink-0">
              <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-900">
                  Live Multi-Agent Discussion Active
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold">
                  {activeAgentSwitch ? `AGENT [${activeAgentSwitch.toUpperCase()}] DEBATING WITH SWARM` : 'SWARM REASONING OVER TELEMETRY...'}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-stone-600 font-medium">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  <span>Cross-referencing Sales Intelligence, Inventory velocities, and Financial ledger overheads...</span>
                </p>
                <p className="flex items-center gap-2 text-stone-500 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Synthesizing inter-agent consensus and quantitative breakdown with Gemini 3.7 Flash...</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Box Bar with Active Agent Switch Indicator */}
      <form onSubmit={handleSubmit} className="space-y-2">
        {activeAgentSwitch && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-mono">
            <div className="flex items-center gap-2">
              <span>{selectedAgentMeta?.avatar}</span>
              <span>Talking directly with: <strong>{selectedAgentMeta?.name}</strong></span>
            </div>
            <button
              type="button"
              onClick={() => setActiveAgentSwitch(null)}
              className="text-amber-800 hover:text-amber-950 font-bold underline"
            >
              Reset to Full Swarm
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputQuery}
            disabled={isLoading}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isLoading 
                ? "Live multi-agent discussion in progress..." 
                : activeAgentSwitch 
                ? `Ask ${selectedAgentMeta?.name} (e.g. 'Audit this expense line', 'Predict stockout dates')...`
                : "Ask your Virtual Management Team (e.g. 'What is my net profit?', 'How can we cut overheads?')..."
            }
            className="flex-1 bg-white border border-[#e6e4df] focus:border-amber-600 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none shadow-xs font-medium disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-[#d97757] hover:bg-[#c25e3f] text-white font-bold text-xs flex items-center gap-2 transition shadow-xs disabled:opacity-60"
          >
            <span>{isLoading ? 'Debating...' : 'Submit'}</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};

