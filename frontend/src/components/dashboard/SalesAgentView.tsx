import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Tag, ShoppingCart, Award } from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { SalesRecord, SKUItem } from '../../lib/types';

interface SalesAgentViewProps {
  salesHistory: SalesRecord[];
  skus: SKUItem[];
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const SalesAgentView: React.FC<SalesAgentViewProps> = ({
  salesHistory,
  skus,
  onExecuteAction
}) => {
  const latestMonth = salesHistory[salesHistory.length - 1];
  const sortedByMargin = [...skus].sort((a, b) => (b.price - b.cost) - (a.price - a.cost));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
              <TrendingUp className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Agent 1: Sales Intelligence & Commercial Forecasting
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Revenue Performance & Product Analytics
          </h3>
          <p className="text-xs text-stone-600">
            Monitors real-time transaction velocity, product margin contribution, and 30-day forecast variance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">AVG ORDER VALUE</span>
            <span className="text-lg font-bold font-mono text-stone-900">₹{latestMonth.avgOrderValue.toFixed(2)}</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">AUG ORDERS</span>
            <span className="text-lg font-bold font-mono text-emerald-800">{latestMonth.orders.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Revenue & Forecast Recharts Chart */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-stone-900">Monthly Revenue Trends vs AI Forecast</h4>
            <p className="text-xs text-stone-500 font-medium">Historical performance with AI predictive trend line</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-600"></span>
              <span className="text-stone-700 font-bold">Actual Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-600"></span>
              <span className="text-stone-700 font-bold">Sales Target</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={salesHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e4df" />
              <XAxis dataKey="date" stroke="#66635c" tick={{ fontSize: 12 }} />
              <YAxis stroke="#66635c" tick={{ fontSize: 12 }} tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e6e4df', borderRadius: '12px', color: '#1a1917' }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, '']}
              />
              <Bar dataKey="revenue" name="Actual Revenue" fill="#059669" radius={[4, 4, 0, 0]} barSize={28} />
              <Area type="monotone" dataKey="target" name="Target" stroke="#4f46e5" fill="none" strokeWidth={2} strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SKU Margin & Contribution Table */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-700" />
            <span>Product Catalog Margin & Profitability Analysis</span>
          </h4>
          <span className="text-xs text-stone-500 font-mono font-bold">6 Active SKUs Analyzed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#e6e4df] text-stone-500 font-mono bg-[#f8f7f2]">
                <th className="p-3 font-bold">SKU ID & Product Name</th>
                <th className="p-3 font-bold">Category</th>
                <th className="p-3 font-bold">Retail Price</th>
                <th className="p-3 font-bold">Cost Price</th>
                <th className="p-3 font-bold">Profit Margin</th>
                <th className="p-3 font-bold">Stock Status</th>
                <th className="p-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e4df] text-stone-800 font-medium">
              {sortedByMargin.map((sku) => {
                const margin = sku.price - sku.cost;
                const marginPct = ((margin / sku.price) * 100).toFixed(1);
                return (
                  <tr key={sku.id} className="hover:bg-[#faf9f6]">
                    <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-2">
                      <span className="font-mono text-amber-800 text-[11px]">{sku.id}</span>
                      <span>{sku.name}</span>
                    </td>
                    <td className="py-3 px-3 text-stone-600">{sku.category}</td>
                    <td className="py-3 px-3 font-mono text-stone-900 font-bold">₹{sku.price.toFixed(2)}</td>
                    <td className="py-3 px-3 font-mono text-stone-600">₹{sku.cost.toFixed(2)}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                      ₹{margin.toFixed(2)} ({marginPct}%)
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        sku.status === 'critical' ? 'bg-rose-100 text-rose-800' :
                        sku.status === 'low_stock' ? 'bg-amber-100 text-amber-800' :
                        sku.status === 'dead_stock' ? 'bg-stone-200 text-stone-700' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {sku.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onExecuteAction('discount', { skuId: sku.id })}
                        className="px-2.5 py-1 rounded-lg bg-[#f3f2ec] hover:bg-[#e6e4df] text-stone-800 font-bold transition text-[11px]"
                      >
                        Promote
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
