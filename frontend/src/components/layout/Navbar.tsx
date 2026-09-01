import React from 'react';
import { 
  Search, 
  Activity, 
  Building2, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { AgentMetadata } from '../../lib/types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  agents: AgentMetadata[];
  isLiveSimulating: boolean;
  setIsLiveSimulating: React.Dispatch<React.SetStateAction<boolean>>;
  healthScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  agents,
  isLiveSimulating,
  setIsLiveSimulating,
  healthScore
}) => {
  const tabTitles: Record<string, string> = {
    executive: 'Executive COO Workspace',
    sales: 'Sales Intelligence & Revenue Analytics',
    inventory: 'Supply Chain & Inventory Operations',
    finance: 'Finance & Liquidity Control',
    customer: 'Customer Experience & Sentiment NLP',
    market: 'Market Intelligence & External Signals',
    chat: 'Multi-Agent Q&A Console',
    integrations: 'Data Ingestion & Event Simulator'
  };

  return (
    <header className="sticky top-0 z-30 bg-[#faf9f6]/90 border-b border-[#e6e4df] backdrop-blur-xl px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <div className="flex items-center gap-1 text-stone-600">
          <Building2 className="h-3.5 w-3.5 text-amber-700" />
          <span className="font-bold text-stone-800">Apex Retail Co.</span>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
        <span className="font-bold text-stone-900 font-sans text-xs">
          {tabTitles[activeTab] || 'Management Console'}
        </span>
      </div>

      {/* Right Controls: Search, Live Feed Toggle, Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar */}
        <div 
          onClick={() => setActiveTab('chat')}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f3f2ec] border border-[#e5e3dc] text-xs text-stone-600 hover:text-stone-900 hover:border-stone-400 cursor-pointer transition w-64 shadow-xs"
        >
          <Search className="h-3.5 w-3.5 text-stone-500" />
          <span className="truncate flex-1 text-[11px]">Ask Claude AI or search data...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[#e6e4df] text-[10px] text-stone-700 font-mono">⌘K</kbd>
        </div>

        {/* Live Simulation Pulse */}
        <button
          onClick={() => setIsLiveSimulating(!isLiveSimulating)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            isLiveSimulating
              ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-[#f3f2ec] text-stone-600 border-[#e5e3dc]'
          }`}
        >
          <Activity className={`h-3.5 w-3.5 ${isLiveSimulating ? 'animate-pulse text-emerald-700' : ''}`} />
          <span className="hidden sm:inline text-[11px] font-bold">{isLiveSimulating ? 'Live Feed Active' : 'Feed Paused'}</span>
        </button>

        {/* Executive Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#e6e4df]">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            EX
          </div>
        </div>
      </div>
    </header>
  );
};
