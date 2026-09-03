import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Activity, 
  Building2, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  LogOut,
  User,
  Check,
  ChevronDown
} from 'lucide-react';
import { AgentMetadata } from '../../lib/types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  agents: AgentMetadata[];
  isLiveSimulating: boolean;
  setIsLiveSimulating: React.Dispatch<React.SetStateAction<boolean>>;
  healthScore: number;
  onSignOut?: () => void;
  onShowToast?: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  agents,
  isLiveSimulating,
  setIsLiveSimulating,
  healthScore,
  onSignOut,
  onShowToast
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Command+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActiveTab('chat');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab]);

  return (
    <header className="sticky top-0 z-30 bg-[#faf9f6]/90 border-b border-[#e6e4df] backdrop-blur-xl px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <button 
          onClick={() => {
            setActiveTab('executive');
            if (onShowToast) onShowToast('Workspace: Apex Mumbai Retail Pvt. Ltd. (Active)');
          }}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition p-1 rounded-lg hover:bg-[#eeebe3]"
        >
          <Building2 className="h-3.5 w-3.5 text-amber-700" />
          <span className="font-bold text-stone-800">Apex Mumbai Retail</span>
        </button>
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
          <span className="truncate flex-1 text-[11px]">Ask Virtual Team or search data...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[#e6e4df] text-[10px] text-stone-700 font-mono">⌘K</kbd>
        </div>

        {/* Live Simulation Pulse */}
        <button
          onClick={() => {
            const nextState = !isLiveSimulating;
            setIsLiveSimulating(nextState);
            if (onShowToast) {
              onShowToast(nextState ? 'Live data streaming resumed.' : 'Live simulation feed paused.');
            }
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            isLiveSimulating
              ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-[#f3f2ec] text-stone-600 border-[#e5e3dc]'
          }`}
          title={isLiveSimulating ? 'Click to pause simulation feed' : 'Click to resume live stream'}
        >
          <Activity className={`h-3.5 w-3.5 ${isLiveSimulating ? 'animate-pulse text-emerald-700' : ''}`} />
          <span className="hidden sm:inline text-[11px] font-bold">{isLiveSimulating ? 'Live Feed Active' : 'Feed Paused'}</span>
        </button>

        {/* Executive Profile Avatar & Dropdown */}
        <div className="relative pl-2 border-l border-[#e6e4df]" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1.5 p-0.5 rounded-xl hover:ring-2 hover:ring-amber-500/30 transition focus:outline-none"
            title="Executive Account & Settings"
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              EX
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-stone-500" />
          </button>

          {/* Profile Popover Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#e6e4df] shadow-xl p-3 space-y-3 z-50 animate-fadeIn">
              <div className="flex items-center gap-3 pb-3 border-b border-[#e6e4df]">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                  EX
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-extrabold text-stone-900 truncate">Executive Console</h4>
                  <p className="text-[11px] text-stone-500 font-mono truncate">demo@mumbairetail.com</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="p-2 rounded-xl bg-[#faf9f6] border border-[#e6e4df] flex items-center justify-between text-[11px]">
                  <span className="text-stone-600 font-medium">Active Workspace</span>
                  <span className="font-bold text-amber-900 font-mono">Apex Mumbai Retail</span>
                </div>
                <div className="p-2 rounded-xl bg-[#faf9f6] border border-[#e6e4df] flex items-center justify-between text-[11px]">
                  <span className="text-stone-600 font-medium">Role Privilege</span>
                  <span className="font-bold text-emerald-800 font-mono">COO / Full Access</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#e6e4df] space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('integrations');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-[#f3f2ec] hover:text-stone-900 transition flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-amber-700" />
                  <span>Data Ingestion & Events</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onSignOut) {
                      onSignOut();
                    } else {
                      localStorage.removeItem('token');
                      document.cookie = 'token=; path=/; max-age=0';
                      window.location.href = '/login';
                    }
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4 text-rose-600" />
                  <span>Sign Out of Console</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
