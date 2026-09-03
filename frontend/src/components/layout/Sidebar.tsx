import React from 'react';
import { 
  Bot, 
  ShieldCheck, 
  TrendingUp, 
  Boxes, 
  Wallet, 
  MessageSquare, 
  Globe, 
  Sparkles, 
  Database, 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  Activity,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AgentMetadata } from '../../lib/types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  agents: AgentMetadata[];
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  healthScore: number;
  onShowToast?: (msg: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  agents,
  isCollapsed,
  setIsCollapsed,
  healthScore,
  onShowToast
}) => {
  const mainNav = [
    { id: 'executive', label: 'Executive COO Workspace', icon: ShieldCheck, color: 'text-amber-700' },
    { id: 'chat', label: 'Multi-Agent Q&A Console', icon: Sparkles, color: 'text-amber-600', badge: 'AI Swarm' },
  ];

  const agentNav = [
    { id: 'sales', label: 'Sales Intelligence', icon: TrendingUp, color: 'text-emerald-700', agentId: 'sales' },
    { id: 'inventory', label: 'Inventory Operations', icon: Boxes, color: 'text-amber-700', agentId: 'inventory', alert: true },
    { id: 'finance', label: 'Finance & Liquidity', icon: Wallet, color: 'text-indigo-700', agentId: 'finance' },
    { id: 'customer', label: 'Customer Experience', icon: MessageSquare, color: 'text-purple-700', agentId: 'customer', alert: true },
    { id: 'market', label: 'Market Research', icon: Globe, color: 'text-blue-700', agentId: 'market' },
  ];

  const systemNav = [
    { id: 'integrations', label: 'Data Ingestion Hub', icon: Database, color: 'text-stone-600' },
  ];

  return (
    <aside 
      className={`relative z-40 bg-[#f3f2ec] border-r border-[#e5e3dc] flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Organization Header */}
      <div className="p-3 border-b border-[#e5e3dc] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="text-xs font-extrabold text-stone-900 tracking-tight truncate flex items-center gap-1.5">
                  <span>Citadel Executive</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-800 border border-amber-500/20 font-bold">
                    Autonomous AI
                  </span>
                </h1>
                <p className="text-[10px] text-stone-500 font-mono truncate">Multi-Agent System</p>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-[#e6e4df] transition flex-shrink-0"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Enterprise Switcher */}
        {!isCollapsed && (
          <div 
            onClick={() => onShowToast && onShowToast('Tenant Workspace: Apex Retail Co. (Single-Tenant Mode Active)')}
            className="p-2 rounded-xl bg-[#e8e6de] border border-[#dcd9ce] text-xs flex items-center justify-between text-stone-800 hover:border-amber-400 hover:bg-[#eae7df] transition cursor-pointer"
            title="Click to inspect active tenant organization"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Building2 className="h-3.5 w-3.5 text-amber-700 flex-shrink-0" />
              <span className="font-bold text-stone-900 truncate text-[11px]">Apex Retail Co.</span>
            </div>
            <span className="text-[10px] text-amber-800 font-mono font-extrabold flex-shrink-0">SME</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        {/* Core Desk */}
        <div className="space-y-1">
          {!isCollapsed && (
            <span className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
              Core Desk
            </span>
          )}
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-[#e5e2d8] text-stone-900 font-bold border border-[#d6d2c4] shadow-sm' 
                    : 'text-stone-700 hover:text-stone-950 hover:bg-[#e8e6de]'
                } ${isCollapsed ? 'justify-center px-0' : 'px-2.5'}`}
                title={item.label}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-amber-800' : item.color}`} />
                  {!isCollapsed && <span className="truncate text-[12px]">{item.label}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold font-mono rounded bg-amber-500/10 text-amber-800 border border-amber-500/20">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Specialized Virtual Team */}
        <div className="space-y-1">
          {!isCollapsed && (
            <span className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
              Specialized AI Agents
            </span>
          )}
          {agentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-[#e5e2d8] text-stone-900 font-bold border border-[#d6d2c4] shadow-sm' 
                    : 'text-stone-700 hover:text-stone-950 hover:bg-[#e8e6de]'
                } ${isCollapsed ? 'justify-center px-0' : 'px-2.5'}`}
                title={item.label}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-amber-800' : item.color}`} />
                  {!isCollapsed && <span className="truncate text-[12px]">{item.label}</span>}
                </div>
                {!isCollapsed && item.alert && (
                  <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Operations */}
        <div className="space-y-1">
          {!isCollapsed && (
            <span className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
              Operations & Data
            </span>
          )}
          {systemNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-[#e5e2d8] text-stone-900 font-bold border border-[#d6d2c4] shadow-sm' 
                    : 'text-stone-700 hover:text-stone-950 hover:bg-[#e8e6de]'
                } ${isCollapsed ? 'justify-center px-0' : 'px-2.5'}`}
                title={item.label}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-amber-800' : item.color}`} />
                  {!isCollapsed && <span className="truncate text-[12px]">{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Health Score */}
      <div className="p-3 border-t border-[#e5e3dc] space-y-2">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-xl bg-[#e8e6de] border border-[#dcd9ce] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600 text-[11px] font-semibold">Management Score</span>
              <span className="font-bold font-mono text-emerald-700">{healthScore}/100</span>
            </div>
            <div className="w-full bg-[#d8d5c9] rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${healthScore}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-stone-600 font-mono pt-1">
              <span>6/6 Agents Syncing</span>
              <span className="text-amber-800 font-bold">LIVE</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center p-2" title={`Health Score: ${healthScore}/100`}>
            <span className="h-3 w-3 rounded-full bg-emerald-600 animate-pulse"></span>
          </div>
        )}
      </div>
    </aside>
  );
};
