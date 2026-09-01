import React from 'react';
import { X, Bot, ShieldCheck, Database, Terminal, Activity, CheckCircle2, Zap } from 'lucide-react';
import { AgentMetadata } from '../../lib/types';

interface AgentInspectorDrawerProps {
  agent: AgentMetadata | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AgentInspectorDrawer: React.FC<AgentInspectorDrawerProps> = ({
  agent,
  isOpen,
  onClose
}) => {
  if (!isOpen || !agent) return null;

  const agentPrompts: Record<string, string> = {
    orchestrator: `ROLE: Chief Operating Officer (COO) Orchestrator Agent
OBJECTIVE: Synthesize multi-agent domain observations across Sales, Inventory, Finance, Customer Experience, and Market Intelligence.
CONFLICT RESOLUTION RULE: When Sales requests promotional expansion while Inventory flags stockouts, prioritize stockout mitigation before authorizing promotions.`,
    sales: `ROLE: Sales Intelligence Agent
OBJECTIVE: Monitor daily order velocity, SKU-level revenue contribution, and 30-day commercial forecasting. Detect trend anomalies and revenue target variances.`,
    inventory: `ROLE: Supply Chain & Inventory Operations Agent
OBJECTIVE: Execute predictive stock depletion algorithms. Reorder SKUs when current stock breaches safety lead-time threshold. Calculate Economic Order Quantity (EOQ).`,
    finance: `ROLE: Finance & Liquidity Agent
OBJECTIVE: Audit monthly cost center variances against budget. Maintain 30-day net cash flow buffer >$10,000. Identify compressible overheads.`,
    customer: `ROLE: Customer Experience & NLP Sentiment Agent
OBJECTIVE: Ingest unstructured WhatsApp Business messages, email tickets, and feedback forms. Extract complaint categories and flag high-risk VIP account churn.`,
    market: `ROLE: Market Intelligence Agent
OBJECTIVE: Crawl competitor web pricing, commodity price indices (Arabica futures), and external macroeconomic category tailwinds.`
  };

  const dataChannels: Record<string, string[]> = {
    orchestrator: ['All 5 Specialized Agent Context Streams', 'SME Executive Ledger'],
    sales: ['Square POS API', 'Shopify Storefront Connector', 'Historical Transaction Log'],
    inventory: ['WMS Warehouse DB', 'Supplier Lead-Time Matrix', 'Barcoding Feed'],
    finance: ['QuickBooks General Ledger', 'Bank Feed API', 'Payroll Ledger'],
    customer: ['WhatsApp Business Support API', 'IMAP Customer Service Email', 'Google Reviews'],
    market: ['Competitor Web Crawler', 'Commodity Price Index Feed', 'Regional Category Data']
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-card bg-white border-l border-[#e6e4df] shadow-2xl p-6 space-y-6 flex flex-col justify-between overflow-y-auto">
          {/* Top Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#e6e4df] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{agent.avatar}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">{agent.name}</h3>
                  <p className="text-xs text-amber-800 font-mono font-bold">{agent.role}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-[#f3f2ec] transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Status & Model Badges */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Status: ACTIVE
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200 font-mono font-bold">
                Model: Gemini 3.6 Flash
              </span>
            </div>

            {/* Agent Overview */}
            <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#e6e4df] space-y-1.5 text-xs">
              <span className="text-[10px] text-stone-500 font-mono uppercase block font-bold">Domain Purpose:</span>
              <p className="text-stone-800 leading-relaxed font-medium">{agent.description}</p>
            </div>

            {/* Active Data Ingestion Channels */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] text-stone-500 font-mono uppercase block font-bold flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-amber-700" />
                <span>Connected Ingestion Channels:</span>
              </span>
              <div className="space-y-1.5">
                {(dataChannels[agent.id] || []).map((ch, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#f3f2ec] border border-[#e5e3dc] text-stone-800 font-mono text-[11px] font-semibold flex items-center justify-between">
                    <span>{ch}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                  </div>
                ))}
              </div>
            </div>

            {/* System Prompt & Reasoning Logic */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] text-stone-500 font-mono uppercase block font-bold flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-indigo-700" />
                <span>System Prompt & Reasoning Rules:</span>
              </span>
              <pre className="p-3.5 rounded-xl bg-[#f8f7f2] border border-[#e5e3dc] text-[11px] text-stone-800 font-mono whitespace-pre-wrap leading-relaxed font-semibold">
                {agentPrompts[agent.id] || agent.description}
              </pre>
            </div>
          </div>

          {/* Footer Close */}
          <div className="pt-4 border-t border-[#e6e4df]">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#f3f2ec] hover:bg-[#e6e4df] text-stone-900 transition"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
