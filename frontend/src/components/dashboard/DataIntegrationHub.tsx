import React from 'react';
import { Database, Zap, RefreshCw, CheckCircle2, MessageSquare, ShoppingCart, Wallet, Globe } from 'lucide-react';
import { DataSourceStatus } from '../../lib/types';

interface DataIntegrationHubProps {
  dataSources: DataSourceStatus[];
  onTriggerSimulatedEvent: (eventType: string) => void;
}

export const DataIntegrationHub: React.FC<DataIntegrationHubProps> = ({
  dataSources,
  onTriggerSimulatedEvent
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-800 border border-amber-500/20">
              <Database className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              Heterogeneous Data Ingestion & Preprocessing Layer
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Data Connectors & Real-Time Simulation Studio
          </h3>
          <p className="text-xs text-stone-600">
            Unifies structured ledger/POS records with unstructured WhatsApp and email communication stream.
          </p>
        </div>
      </div>

      {/* Real-Time Event Simulator Studio */}
      <div className="glass-card p-6 rounded-2xl border border-amber-500/30 bg-[#fefcf8] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
            <Zap className="h-5 w-5 animate-pulse text-amber-600" />
            <span>Interactive Operational Event Injector</span>
          </div>
          <span className="text-xs text-stone-500 font-mono font-bold">Test Multi-Agent System Reaction</span>
        </div>

        <p className="text-xs text-stone-700 font-medium">
          Click any scenario below to inject real-time operational events into the data engine and watch all specialized agents re-evaluate live:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <button
            onClick={() => onTriggerSimulatedEvent('sales_spike')}
            className="p-4 rounded-xl bg-white border border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition group space-y-1 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">Simulate POS Sales Spike</span>
              <ShoppingCart className="h-4 w-4 text-emerald-700" />
            </div>
            <p className="text-[11px] text-stone-600">
              Injects +50 orders for Organic Coffee (SKU-884). Forces stock depletion date closer.
            </p>
          </button>

          <button
            onClick={() => onTriggerSimulatedEvent('whatsapp_complaint')}
            className="p-4 rounded-xl bg-white border border-rose-300 hover:border-rose-500 hover:bg-rose-50/40 text-left transition group space-y-1 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">Inject WhatsApp Surge</span>
              <MessageSquare className="h-4 w-4 text-rose-700" />
            </div>
            <p className="text-[11px] text-stone-600">
              Injects 5 high-priority customer complaints regarding shipping delays.
            </p>
          </button>

          <button
            onClick={() => onTriggerSimulatedEvent('logistics_hike')}
            className="p-4 rounded-xl bg-white border border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50/40 text-left transition group space-y-1 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-800">Logistics Cost Increase</span>
              <Wallet className="h-4 w-4 text-indigo-700" />
            </div>
            <p className="text-[11px] text-stone-600">
              Increases express freight bill by $2,200. Triggers Finance expense alert.
            </p>
          </button>

          <button
            onClick={() => onTriggerSimulatedEvent('competitor_promo')}
            className="p-4 rounded-xl bg-white border border-amber-300 hover:border-amber-500 hover:bg-amber-50/40 text-left transition group space-y-1 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">Competitor Price Cut</span>
              <Globe className="h-4 w-4 text-amber-700" />
            </div>
            <p className="text-[11px] text-stone-600">
              Triggers market crawler signal: Competitor cut coffee price by 25%.
            </p>
          </button>
        </div>
      </div>

      {/* Connected Data Sources List */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
        <h4 className="text-base font-bold text-stone-900">Active Heterogeneous Connectors</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSources.map((ds) => (
            <div key={ds.id} className="p-4 rounded-xl bg-[#faf9f6] border border-[#e6e4df] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">{ds.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                  ds.status === 'connected' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  <CheckCircle2 className="h-3 w-3" />
                  {ds.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 font-mono font-semibold">
                Records Ingested: <span className="text-stone-900 font-bold">{ds.recordCount.toLocaleString()}</span>
              </p>
              <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono font-semibold pt-1">
                <span>{ds.unstructured ? 'Unstructured Text NLP' : 'Structured SQL/API'}</span>
                <span>Sync: {ds.lastSync}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
