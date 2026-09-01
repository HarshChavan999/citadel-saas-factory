import React, { useState } from 'react';
import { Boxes, AlertTriangle, ArrowUpRight, Clock, RefreshCw, Layers, Search, Filter } from 'lucide-react';
import { SKUItem } from '../../lib/types';

interface InventoryAgentViewProps {
  skus: SKUItem[];
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const InventoryAgentView: React.FC<InventoryAgentViewProps> = ({
  skus,
  onExecuteAction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const criticalList = skus.filter(s => s.status === 'critical');
  const deadStockList = skus.filter(s => s.status === 'dead_stock');
  const totalDeadCapital = deadStockList.reduce((acc, curr) => acc + curr.workingCapitalLocked, 0);

  const filteredSkus = skus.filter(sku => {
    const matchesSearch = sku.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sku.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sku.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sku.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Boxes className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Agent 2: Supply Chain & Inventory Operations
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Stock Depletion & Reorder Optimization (EOQ)
          </h3>
          <p className="text-xs text-slate-400">
            Predicts zero-balance dates per SKU, recommends Economic Order Quantities, and identifies dead capital.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 block font-mono">DEAD CAPITAL LOCKED</span>
            <span className="text-lg font-bold font-mono text-rose-400">${totalDeadCapital.toLocaleString()}</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 block font-mono">CRITICAL SKUS</span>
            <span className="text-lg font-bold font-mono text-amber-400">{criticalList.length} Items</span>
          </div>
        </div>
      </div>

      {/* Critical Stockout Alerts Banner */}
      {criticalList.length > 0 && (
        <div className="glass-card p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="h-5 w-5 animate-bounce" />
            <span>CRITICAL STOCKOUT WARNING: Action Required Immediately</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {criticalList.map(sku => (
              <div key={sku.id} className="p-3 rounded-xl bg-slate-900/90 border border-rose-500/30 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">{sku.name} ({sku.id})</h5>
                  <p className="text-[11px] text-slate-400">
                    Stock: <span className="font-mono text-rose-400 font-bold">{sku.currentStock} units</span> | Stockout in: <span className="font-mono text-amber-400 font-bold">{sku.daysUntilStockout} Days</span>
                  </p>
                </div>
                <button
                  onClick={() => onExecuteAction('reorder', { skuId: sku.id, qty: sku.reorderQuantity })}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
                >
                  Reorder {sku.reorderQuantity} Units
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Depletion Matrix Table & Search Bar */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-400" />
            <span>Predictive Stock Depletion & Reorder Matrix</span>
          </h4>

          {/* Search & Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SKU or Name..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              {['all', 'critical', 'low_stock', 'optimal', 'dead_stock'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 rounded text-[10px] font-mono capitalize transition ${
                    statusFilter === st ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="pb-3 font-semibold">SKU ID & Product Name</th>
                <th className="pb-3 font-semibold">Current Stock</th>
                <th className="pb-3 font-semibold">Depletion Velocity</th>
                <th className="pb-3 font-semibold">Est. Days to Zero</th>
                <th className="pb-3 font-semibold">Optimal EOQ Reorder</th>
                <th className="pb-3 font-semibold">Supplier</th>
                <th className="pb-3 font-semibold text-right">Trigger Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredSkus.map((sku) => (
                <tr key={sku.id} className="hover:bg-slate-900/40">
                  <td className="py-3 font-medium text-white">
                    <span className="font-mono text-cyan-400 text-[11px] block">{sku.id}</span>
                    <span>{sku.name}</span>
                  </td>
                  <td className="py-3 font-mono text-white font-bold">{sku.currentStock} units</td>
                  <td className="py-3 font-mono text-slate-400">{sku.dailyDepletionRate} / day</td>
                  <td className="py-3 font-mono">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      sku.daysUntilStockout <= 5 ? 'bg-rose-500/20 text-rose-300' :
                      sku.daysUntilStockout <= 20 ? 'bg-amber-500/20 text-amber-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {sku.daysUntilStockout} Days
                    </span>
                  </td>
                  <td className="py-3 font-mono text-cyan-300">{sku.reorderQuantity} units</td>
                  <td className="py-3 text-slate-400">{sku.supplier}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onExecuteAction('reorder', { skuId: sku.id, qty: sku.reorderQuantity })}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-[11px] transition"
                    >
                      Issue PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

