import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  X, 
  IndianRupee, 
  Clock, 
  Boxes, 
  Wallet, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';

interface ActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionTitle: string;
  actionType: string;
  payload: Record<string, any>;
}

export const ActionConfirmationModal: React.FC<ActionConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  actionTitle,
  actionType,
  payload
}) => {
  if (!isOpen) return null;

  const actionDetails = {
    reorder: {
      category: 'SUPPLY CHAIN REORDER',
      icon: Boxes,
      color: 'text-amber-800',
      badgeBg: 'bg-amber-100 border-amber-200 text-amber-900',
      capital: '₹3,30,000 PO Expenditure',
      impact: 'Prevents ₹3,86,400 lost revenue over next 14 days',
      riskReduction: '95% reduction in stockout churn risk'
    },
    discount: {
      category: 'DEAD STOCK LIQUIDATION',
      icon: IndianRupee,
      color: 'text-emerald-800',
      badgeBg: 'bg-emerald-100 border-emerald-200 text-emerald-900',
      capital: '₹0 Capital Required',
      impact: 'Reclaims ~₹2,26,800 in stagnant working capital',
      riskReduction: 'Frees 12% warehouse shelf space in Bhiwandi'
    },
    cut_expense: {
      category: 'COST CENTER OPTIMIZATION',
      icon: Wallet,
      color: 'text-indigo-800',
      badgeBg: 'bg-indigo-100 border-indigo-200 text-indigo-900',
      capital: '₹0 Cost',
      impact: 'Saves ~₹3,12,000/month in freight surcharges',
      riskReduction: 'Protects operating cash flow buffer'
    },
    contact_customer: {
      category: 'VIP RETENTION OUTREACH',
      icon: MessageSquare,
      color: 'text-purple-800',
      badgeBg: 'bg-purple-100 border-purple-200 text-purple-900',
      capital: '₹12,000 Credit Voucher Budget',
      impact: 'Protects 3 VIP commercial wholesale accounts (₹11.2L ARR)',
      riskReduction: 'Restores CSAT score by +12 points'
    }
  }[actionType] || {
    category: 'EXECUTIVE STRATEGIC ACTION',
    icon: Sparkles,
    color: 'text-amber-800',
    badgeBg: 'bg-amber-100 border-amber-200 text-amber-900',
    capital: 'N/A',
    impact: 'Optimizes operational KPI metrics',
    riskReduction: 'Reduces operational variance'
  };

  const Icon = actionDetails.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card max-w-lg w-full rounded-2xl border border-[#e6e4df] p-6 space-y-6 shadow-xl relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700"></div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#f3f2ec] border border-[#e5e3dc] text-amber-800">
              <Icon className={`h-6 w-6 ${actionDetails.color}`} />
            </div>
            <div>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider ${actionDetails.badgeBg}`}>
                {actionDetails.category}
              </span>
              <h3 className="text-lg font-extrabold text-stone-900 tracking-tight mt-1">
                Executive Action Authorization
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-[#f3f2ec] transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Title */}
        <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#e6e4df] space-y-1">
          <span className="text-[10px] text-stone-500 font-mono uppercase block font-bold">Target Decision:</span>
          <p className="text-sm font-bold text-stone-900">{actionTitle}</p>
        </div>

        {/* Expected Financial Impact Matrix */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#f3f2ec] border border-[#e5e3dc] space-y-0.5">
            <span className="text-stone-500 block font-mono text-[10px] font-bold">CAPITAL REQUIREMENT</span>
            <span className="font-bold text-stone-900 font-mono">{actionDetails.capital}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#f3f2ec] border border-[#e5e3dc] space-y-0.5">
            <span className="text-stone-500 block font-mono text-[10px] font-bold">TIMEFRAME</span>
            <span className="font-bold text-amber-900 font-mono">Immediate Execution</span>
          </div>
          <div className="col-span-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-0.5">
            <span className="text-emerald-800 block font-mono text-[10px] font-bold">ESTIMATED FINANCIAL BENEFIT</span>
            <span className="font-bold text-emerald-900">{actionDetails.impact}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#e6e4df]">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-stone-600 hover:text-stone-900 hover:bg-[#f3f2ec] transition"
          >
            Cancel / Dismiss
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#d97757] hover:bg-[#c25e3f] text-white shadow-xs transition"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Confirm & Execute Decision</span>
          </button>
        </div>
      </div>
    </div>
  );
};
