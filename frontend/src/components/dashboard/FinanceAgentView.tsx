import React from 'react';
import { Wallet, DollarSign, TrendingDown, ArrowUpRight, ShieldAlert, PieChart as PieIcon } from 'lucide-react';
import { ExpenseRecord } from '../../lib/types';

interface FinanceAgentViewProps {
  expenses: ExpenseRecord[];
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const FinanceAgentView: React.FC<FinanceAgentViewProps> = ({
  expenses,
  onExecuteAction
}) => {
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalBudget = expenses.reduce((acc, curr) => acc + curr.budget, 0);
  const totalOverrun = expenses
    .filter(e => e.amount > e.budget)
    .reduce((acc, curr) => acc + (curr.amount - curr.budget), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-800 border border-indigo-500/20">
              <Wallet className="h-5 w-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-800">
              Agent 3: Finance & Liquidity Control
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Expense Variance & Cash Flow Protection
          </h3>
          <p className="text-xs text-stone-600">
            Monitors monthly cost centers against budget limits, profitability margins, and 30-day liquidity risks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">TOTAL EXPENSES</span>
            <span className="text-lg font-bold font-mono text-stone-900">${totalSpent.toLocaleString()}</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl text-right bg-[#f8f7f2]">
            <span className="text-[10px] text-stone-500 block font-mono font-bold">BUDGET VARIANCE</span>
            <span className="text-lg font-bold font-mono text-rose-700">+${totalOverrun.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Expense Variance Ledger Table */}
      <div className="glass-card p-6 rounded-2xl border border-[#e6e4df] bg-white space-y-4 shadow-xs">
        <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-indigo-700" />
          <span>Monthly Expense Variance Ledger</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#e6e4df] text-stone-500 font-mono bg-[#f8f7f2]">
                <th className="p-3 font-bold">Expense Category</th>
                <th className="p-3 font-bold">Description</th>
                <th className="p-3 font-bold">Actual Spent</th>
                <th className="p-3 font-bold">Budgeted</th>
                <th className="p-3 font-bold">Variance</th>
                <th className="p-3 font-bold">Status</th>
                <th className="p-3 font-bold text-right">Optimization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e4df] text-stone-800 font-medium">
              {expenses.map((exp) => {
                const diff = exp.amount - exp.budget;
                const isOver = diff > 0;
                return (
                  <tr key={exp.id} className="hover:bg-[#faf9f6]">
                    <td className="py-3 px-3 font-bold text-stone-900">{exp.category}</td>
                    <td className="py-3 px-3 text-stone-600 max-w-xs truncate">{exp.description}</td>
                    <td className="py-3 px-3 font-mono font-bold text-stone-900">${exp.amount.toLocaleString()}</td>
                    <td className="py-3 px-3 font-mono text-stone-600">${exp.budget.toLocaleString()}</td>
                    <td className={`py-3 px-3 font-mono font-bold ${isOver ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {isOver ? `+$${diff.toLocaleString()}` : `$${diff.toLocaleString()}`}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        exp.status === 'over_budget' ? 'bg-rose-100 text-rose-800' :
                        exp.status === 'compressible' ? 'bg-amber-100 text-amber-800' :
                        'bg-stone-200 text-stone-700'
                      }`}>
                        {exp.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {exp.status !== 'normal' && (
                        <button
                          onClick={() => onExecuteAction('cut_expense', { expenseId: exp.id })}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold transition text-[11px]"
                        >
                          Optimize Cost
                        </button>
                      )}
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
