import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  ChevronRight, 
  ChevronDown, 
  ArrowUpRight, 
  ShieldCheck, 
  Terminal, 
  Users,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { ChatMessage, AgentMetadata } from '../../lib/types';
import { PRESET_EXECUTIVE_QUERIES } from '../../lib/mockData';
import { AgentBadge } from '../ui/AgentBadge';

interface MultiAgentChatConsoleProps {
  messages: ChatMessage[];
  agents: AgentMetadata[];
  onSendMessage: (query: string) => void;
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const MultiAgentChatConsole: React.FC<MultiAgentChatConsoleProps> = ({
  messages,
  agents,
  onSendMessage,
  onExecuteAction
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [selectedBoss, setSelectedBoss] = useState<string>('all');
  const [expandedReasoningMap, setExpandedReasoningMap] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 0) {
      const latestMsg = messages[messages.length - 1];
      if (latestMsg.reasoningSteps && latestMsg.reasoningSteps.length > 0) {
        setExpandedReasoningMap(prev => ({ ...prev, [latestMsg.id]: true }));
      }
    }
  }, [messages]);

  const toggleReasoning = (msgId: string) => {
    setExpandedReasoningMap(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    let finalQuery = inputQuery.trim();
    if (selectedBoss !== 'all') {
      const targetAgent = agents.find(a => a.id === selectedBoss);
      if (targetAgent && targetAgent.bossName) {
        finalQuery = `[Direct to ${targetAgent.bossName} (${targetAgent.bossTitle})]: ${finalQuery}`;
      }
    }

    onSendMessage(finalQuery);
    setInputQuery('');
  };

  const currentTargetBoss = agents.find(a => a.id === selectedBoss);

  return (
    <div className="space-y-6">
      {/* Top Banner & Boss Selector */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-800 border border-amber-500/20">
              <Users className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              Real-Time C-Suite Executive Discussion Suite
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Conversational Executive Boardroom
          </h3>
          <p className="text-xs text-stone-600">
            Converse directly with named executive bosses (Arthur, Sarah, Marcus, Victor, Elena, David) for honest real-time business reviews.
          </p>
        </div>

        {/* Executive Boss Discussion Selector */}
        <div className="flex items-center gap-2 bg-[#f8f7f2] p-2 rounded-xl border border-[#e5e3dc]">
          <span className="text-[11px] font-mono text-stone-600 font-bold hidden sm:inline pl-1">SPEAK WITH:</span>
          <select
            value={selectedBoss}
            onChange={(e) => setSelectedBoss(e.target.value)}
            className="bg-white border border-[#e6e4df] text-xs font-bold text-stone-900 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-600 shadow-xs cursor-pointer"
          >
            <option value="all">👥 Full Executive Roundtable (All 6 Bosses)</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.avatar} {agent.bossName || agent.name} ({agent.bossTitle || agent.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preset Queries Row */}
      <div className="space-y-2">
        <span className="text-xs text-stone-600 font-mono flex items-center gap-1.5 font-bold">
          <Sparkles className="h-3.5 w-3.5 text-amber-700" />
          <span>SUGGESTED EXECUTIVE ROUNDTABLE TOPICS:</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_EXECUTIVE_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(preset.query)}
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
          const isReasoningExpanded = !!expandedReasoningMap[msg.id];
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

              {/* Multi-Agent Executive Answer Card */}
              <div className="glass-card p-5 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
                {/* Boardroom Header */}
                <div className="flex items-center justify-between border-b border-[#e6e4df] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold shadow-xs text-sm">
                      👔
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-stone-900">
                        Arthur Pendelton (COO) & Executive Boardroom
                      </h4>
                      <p className="text-[10px] text-stone-500 font-mono">Live Natural Discussion & Honest Review</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">{msg.timestamp}</span>
                </div>

                {/* Live Conversational Dialogue Accordion */}
                {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                  <div className="rounded-xl border border-[#e5e3dc] bg-[#f8f7f2] overflow-hidden">
                    <button
                      onClick={() => toggleReasoning(msg.id)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono text-stone-800 hover:bg-[#eeebe3] transition"
                    >
                      <div className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-amber-700" />
                        <span className="font-bold text-amber-900">
                          {isReasoningExpanded ? 'Hide Live Executive Boardroom Conversation' : 'View Live Executive Boardroom Conversation'}
                        </span>
                        <span className="text-[10px] text-stone-500">({msg.reasoningSteps.length} executive turns)</span>
                      </div>
                      {isReasoningExpanded ? <ChevronDown className="h-4 w-4 text-stone-600" /> : <ChevronRight className="h-4 w-4 text-stone-600" />}
                    </button>

                    {isReasoningExpanded && (
                      <div className="p-4 border-t border-[#e5e3dc] space-y-3 bg-[#f3f2ec] animate-slideDown">
                        <div className="space-y-3.5 relative border-l border-amber-500/30 pl-4 ml-2">
                          {msg.reasoningSteps.map((step, sIdx) => {
                            const agent = agents.find(a => a.id === step.agentId);
                            const avatar = agent ? agent.avatar : '👤';
                            const bossTitle = agent ? (agent.bossTitle || agent.role) : 'Executive';
                            return (
                              <div key={sIdx} className="space-y-1 relative">
                                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-600 ring-4 ring-[#f3f2ec]"></span>
                                <div className="flex items-center gap-2">
                                  <span className="text-base">{avatar}</span>
                                  <span className="text-xs font-extrabold text-stone-900">
                                    {step.agentName}
                                  </span>
                                  <span className="text-[10px] text-stone-500 font-mono">
                                    ({bossTitle})
                                  </span>
                                </div>
                                <div className="p-3 rounded-xl bg-white border border-[#e5e3dc] text-xs text-stone-800 leading-relaxed font-sans font-medium shadow-xs">
                                  "{step.thought}"
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Final Synthesized Honest Review */}
                {msg.finalAnswer && (
                  <div className="text-xs text-stone-800 leading-relaxed whitespace-pre-line font-sans font-medium p-4 rounded-xl bg-[#faf9f6] border border-[#e6e4df]">
                    {msg.finalAnswer}
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
                        onClick={() => onExecuteAction(act.actionType, act.payload)}
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={
            selectedBoss === 'all'
              ? "Ask the Executive Roundtable (e.g. 'Arthur, why did sales drop this month?')..."
              : `Ask ${currentTargetBoss?.bossName || 'Boss'} (${currentTargetBoss?.bossTitle || ''}) directly...`
          }
          className="flex-1 bg-white border border-[#e6e4df] focus:border-amber-600 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none shadow-xs font-medium"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-[#d97757] hover:bg-[#c25e3f] text-white font-bold text-xs flex items-center gap-2 transition shadow-xs"
        >
          <span>Send to Boardroom</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
};
