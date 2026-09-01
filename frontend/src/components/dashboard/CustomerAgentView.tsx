import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, MessageCircle, AlertCircle, UserCheck } from 'lucide-react';
import { CustomerFeedback } from '../../lib/types';

interface CustomerAgentViewProps {
  feedbacks: CustomerFeedback[];
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const CustomerAgentView: React.FC<CustomerAgentViewProps> = ({
  feedbacks,
  onExecuteAction
}) => {
  const negCount = feedbacks.filter(f => f.sentiment === 'negative').length;
  const posCount = feedbacks.filter(f => f.sentiment === 'positive').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-800 border border-purple-500/20">
              <MessageSquare className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-800">
              Agent 4: Customer Experience & Unstructured Sentiment NLP
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            WhatsApp & Communication Stream Sentiment
          </h3>
          <p className="text-xs text-stone-600">
            Parses unstructured WhatsApp Business chats, email tickets, and feedback forms to surface customer retention risks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">POSITIVE SENTIMENT</span>
            <span className="text-lg font-bold font-mono text-emerald-800">{posCount} Messages</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">NEGATIVE ALERTS</span>
            <span className="text-lg font-bold font-mono text-rose-700">{negCount} Incidents</span>
          </div>
        </div>
      </div>

      {/* Customer Feedback Feed */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
        <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-purple-700" />
          <span>Real-Time Heterogeneous Customer Feedback Stream</span>
        </h4>

        <div className="space-y-3">
          {feedbacks.map((item) => (
            <div 
              key={item.id}
              className={`p-4 rounded-xl space-y-2 border transition ${
                item.sentiment === 'negative' ? 'border-rose-300 bg-rose-50/50' :
                item.sentiment === 'positive' ? 'border-emerald-300 bg-emerald-50/50' :
                'border-[#e6e4df] bg-[#faf9f6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    item.channel === 'whatsapp' ? 'bg-emerald-100 text-emerald-800' :
                    item.channel === 'email' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {item.channel}
                  </span>
                  <span className="text-xs font-bold text-stone-900">{item.customerName}</span>
                </div>
                <span className="text-[11px] text-stone-500 font-mono font-medium">{item.date}</span>
              </div>

              <p className="text-xs text-stone-800 leading-relaxed italic font-medium">
                "{item.message}"
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-stone-500 font-mono font-semibold">
                  Category: <span className="text-amber-800 font-bold">{item.category.replace('_', ' ')}</span>
                </span>
                {item.sentiment === 'negative' && (
                  <button
                    onClick={() => onExecuteAction('contact_customer', { customerName: item.customerName })}
                    className="px-2.5 py-1 rounded-lg bg-[#d97757] hover:bg-[#c25e3f] text-white transition font-bold"
                  >
                    Send Priority Apology & Voucher
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
