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
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-800 border border-amber-500/20">
              <Boxes className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              Agent 2: Supply Chain & Inventory Operations
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Stock Depletion & Reorder Optimization (EOQ)
          </h3>
          <p className="text-xs text-stone-600">
            Predicts zero-balance dates per SKU, recommends Economic Order Quantities, and identifies dead capital.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">DEAD CAPITAL LOCKED</span>
            <span className="text-lg font-bold font-mono text-rose-700">₹{totalDeadCapital.toLocaleString()}</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">CRITICAL SKUS</span>
            <span className="text-lg font-bold font-mono text-amber-800">{criticalList.length} Items</span>
          </div>
        </div>
      </div>

      {/* Critical Stockout Alerts Banner */}
      {criticalList.length > 0 && (
        <div className="glass-card p-5 rounded-2xl border border-rose-300 bg-rose-50/50 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <span>CRITICAL STOCKOUT WARNING: Immediate Action Recommended</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {criticalList.map(sku => (
              <div key={sku.id} className="p-3.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between shadow-xs">
                <div>
                  <h5 className="text-xs font-bold text-stone-900">{sku.name} ({sku.id})</h5>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Stock: <span className="font-mono text-rose-700 font-bold">{sku.currentStock} units</span> | Stockout in: <span className="font-mono text-amber-800 font-bold">{sku.daysUntilStockout} Days</span>
                  </p>
                </div>
                <button
                  onClick={() => onExecuteAction('reorder', { skuId: sku.id, qty: sku.reorderQuantity })}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#d97757] hover:bg-[#c25e3f] text-white shadow-xs transition"
                >
                  Reorder {sku.reorderQuantity} Units
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Depletion Matrix Table & Search Bar */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-700" />
            <span>Predictive Stock Depletion & Reorder Matrix</span>
          </h4>

          {/* Search & Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SKU or Name..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-[#faf9f6] border border-[#e6e4df] text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-medium"
              />
            </div>
            
            <div className="flex items-center gap-1 bg-[#f3f2ec] p-1 rounded-xl border border-[#e5e3dc] text-xs">
              {['all', 'critical', 'low_stock', 'optimal', 'dead_stock'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono capitalize transition ${
                    statusFilter === st 
                      ? 'bg-white text-stone-900 font-bold shadow-xs border border-[#dcd9ce]' 
                      : 'text-stone-600 hover:text-stone-900'
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
              <tr className="border-b border-[#e6e4df] text-stone-500 font-mono bg-[#f8f7f2]">
                <th className="p-3 font-bold">SKU ID & Product Name</th>
                <th className="p-3 font-bold">Current Stock</th>
                <th className="p-3 font-bold">Depletion Velocity</th>
                <th className="p-3 font-bold">Est. Days to Zero</th>
                <th className="p-3 font-bold">Optimal EOQ Reorder</th>
                <th className="p-3 font-bold">Supplier</th>
                <th className="p-3 font-bold text-right">Trigger Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e4df] text-stone-800 font-medium">
              {filteredSkus.map((sku) => (
                <tr key={sku.id} className="hover:bg-[#faf9f6]">
                  <td className="py-3 px-3 font-medium text-stone-900">
                    <span className="font-mono text-amber-800 text-[11px] block font-bold">{sku.id}</span>
                    <span className="font-bold">{sku.name}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-900 font-bold">{sku.currentStock} units</td>
                  <td className="py-3 px-3 font-mono text-stone-600">{sku.dailyDepletionRate} / day</td>
                  <td className="py-3 px-3 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sku.daysUntilStockout <= 5 ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      sku.daysUntilStockout <= 20 ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {sku.daysUntilStockout} Days
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-900 font-bold">{sku.reorderQuantity} units</td>
                  <td className="py-3 px-3 text-stone-600">{sku.supplier}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onExecuteAction('reorder', { skuId: sku.id, qty: sku.reorderQuantity })}
                      className="px-3 py-1.5 rounded-xl bg-[#d97757] hover:bg-[#c25e3f] text-white font-bold text-[11px] shadow-xs transition"
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

