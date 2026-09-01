import React from 'react';
import { Globe, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';
import { MarketSignal } from '../../lib/types';

interface MarketAgentViewProps {
  signals: MarketSignal[];
}

export const MarketAgentView: React.FC<MarketAgentViewProps> = ({ signals }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-800 border border-blue-500/20">
              <Globe className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
              Agent 5: Market Intelligence & External Signals
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Competitor Benchmarking & Commodity Trends
          </h3>
          <p className="text-xs text-stone-600">
            Monitors competitor pricing updates, raw material commodity indices, and category demand shifts.
          </p>
        </div>
      </div>

      {/* Signals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {signals.map((sig) => {
          const isNegative = sig.impactScore < 0;
          return (
            <div 
              key={sig.id}
              className="glass-card p-5 rounded-2xl border border-[#e6e4df] bg-white space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-800 font-mono tracking-wide uppercase font-bold">{sig.category.replace('_', ' ')}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isNegative ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Impact: {sig.impactScore > 0 ? `+${sig.impactScore}` : sig.impactScore}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-stone-900">{sig.title}</h5>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {sig.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e6e4df] flex items-center justify-between text-[11px] text-stone-500 font-mono font-bold">
                <span>Source: {sig.source}</span>
                <span>{sig.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
