'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  ShieldCheck, 
  TrendingUp, 
  Boxes, 
  Wallet, 
  MessageSquare, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  Building2,
  Database,
  Sliders,
  Terminal,
  Activity
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-900">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-[#e6e4df] bg-[#faf9f6]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center shadow-xs">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
                Citadel BI & OS
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-500/20">
                  Claude AI Virtual Team
                </span>
              </h1>
              <p className="text-xs text-stone-500">AI Decision Support System for SMEs</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#d97757] hover:bg-[#c25e3f] text-white shadow-xs transition flex items-center gap-2"
            >
              <span>Launch Management Console</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8 overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-amber-500/30 text-xs font-mono text-amber-900 font-bold bg-[#fefcf8]">
          <Sparkles className="h-4 w-4 text-amber-700 animate-pulse" />
          <span>Research Paper Implementation • Multi-Agent Virtual Management Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Enterprise-Grade Decision Support for SMEs, Powered by <span className="text-[#d97757]">Multi-Agent Claude AI</span>
        </h1>

        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Replaces passive dashboards with an active virtual executive team. Six specialized AI agents continuously ingest billing, inventory, WhatsApp messages, and financial ledgers to deliver explainable, data-driven decisions.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-xl font-bold text-sm bg-[#d97757] hover:bg-[#c25e3f] text-white shadow-md transition flex items-center gap-3 scale-105"
          >
            <span>Launch Live Virtual Team Demo</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#architecture"
            className="px-8 py-4 rounded-xl font-bold text-sm glass-card border border-[#e6e4df] text-stone-700 hover:text-stone-900 hover:border-stone-400 transition flex items-center gap-2 bg-white"
          >
            <span>View Architecture (Fig. 1)</span>
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
          <div className="glass-card p-5 rounded-2xl border border-[#e6e4df] bg-white space-y-2 shadow-xs">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-800 inline-block">
              <Bot className="h-5 w-5" />
            </span>
            <h4 className="font-extrabold text-stone-900 text-sm">6 Autonomous Agents</h4>
            <p className="text-xs text-stone-600 font-medium">Sales, Inventory, Finance, CX, Market & COO Orchestrator.</p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-[#e6e4df] bg-white space-y-2 shadow-xs">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-800 inline-block">
              <Database className="h-5 w-5" />
            </span>
            <h4 className="font-extrabold text-stone-900 text-sm">Heterogeneous Ingestion</h4>
            <p className="text-xs text-stone-600 font-medium">POS, ERP, WhatsApp API, Email & QuickBooks support.</p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-[#e6e4df] bg-white space-y-2 shadow-xs">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-800 inline-block">
              <MessageSquare className="h-5 w-5" />
            </span>
            <h4 className="font-extrabold text-stone-900 text-sm">Natural Language Q&A</h4>
            <p className="text-xs text-stone-600 font-medium">Ask questions in plain language & inspect multi-agent traces.</p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-[#e6e4df] bg-white space-y-2 shadow-xs">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-800 inline-block">
              <Zap className="h-5 w-5" />
            </span>
            <h4 className="font-extrabold text-stone-900 text-sm">Real-Time Simulation</h4>
            <p className="text-xs text-stone-600 font-medium">Inject operational events and watch live multi-agent adaptation.</p>
          </div>
        </div>
      </section>

      {/* Architecture Diagram Section (Fig 1 from Paper) */}
      <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest">
            System Architecture (Section IV)
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900">
            Layered Multi-Agent System Pipeline
          </h2>
          <p className="text-sm text-stone-600 max-w-2xl mx-auto font-medium">
            From heterogeneous data ingestion to natural-language multi-agent executive reasoning.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-[#e6e4df] space-y-8 bg-white shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
            <div className="glass-card p-4 rounded-xl border border-[#e6e4df] bg-[#f8f7f2] space-y-2 text-center">
              <span className="text-[10px] font-mono text-amber-800 uppercase block font-bold">1. Data Sources</span>
              <p className="text-xs text-stone-900 font-bold">POS, Inventory, WhatsApp, Email, Ledger</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-[#e6e4df] bg-[#f8f7f2] space-y-2 text-center">
              <span className="text-[10px] font-mono text-amber-800 uppercase block font-bold">2. Preprocessing</span>
              <p className="text-xs text-stone-900 font-bold">Cleaning, Timestamping, NLP Parsing</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-[#e6e4df] bg-[#f8f7f2] space-y-2 text-center">
              <span className="text-[10px] font-mono text-amber-800 uppercase block font-bold">3. Specialized Agents</span>
              <p className="text-xs text-stone-900 font-bold">5 Functional Domain Agents</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-[#e6e4df] bg-[#f8f7f2] space-y-2 text-center">
              <span className="text-[10px] font-mono text-amber-800 uppercase block font-bold">4. COO Orchestrator</span>
              <p className="text-xs text-stone-900 font-bold">Conflict Resolution & Action Plan</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-[#e6e4df] bg-[#f8f7f2] space-y-2 text-center">
              <span className="text-[10px] font-mono text-amber-800 uppercase block font-bold">5. NL Interface</span>
              <p className="text-xs text-stone-900 font-bold">Conversational Q&A & Action Triggers</p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-amber-400 bg-amber-50 space-y-2 text-center">
              <span className="text-[10px] font-mono text-amber-900 uppercase block font-bold">6. SME Owner</span>
              <p className="text-xs text-amber-950 font-bold">Data-Driven Executive Decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section (Table I from Paper) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest">
            Table I Benchmark Comparison
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900">
            Conventional Dashboard vs Proposed Virtual AI Management Team
          </h2>
        </div>

        <div className="glass-card rounded-2xl border border-[#e6e4df] bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e6e4df] text-stone-600 font-mono bg-[#f8f7f2]">
                <th className="p-4 font-bold">Aspect</th>
                <th className="p-4 font-bold text-stone-600">Conventional Dashboard</th>
                <th className="p-4 font-bold text-amber-900">Proposed AI Agent System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e4df] text-stone-800 font-medium">
              <tr>
                <td className="p-4 font-bold text-stone-900">Role</td>
                <td className="p-4 text-stone-600">Passive data display</td>
                <td className="p-4 font-bold text-amber-900">Active virtual management team</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-stone-900">Interaction</td>
                <td className="p-4 text-stone-600">Manual chart reading</td>
                <td className="p-4 font-bold text-amber-900">Natural-language Q&A</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-stone-900">Insight</td>
                <td className="p-4 text-stone-600">Owner must interpret</td>
                <td className="p-4 font-bold text-amber-900">System explains and recommends</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-stone-900">Data Scope</td>
                <td className="p-4 text-stone-600">Single structured source</td>
                <td className="p-4 font-bold text-amber-900">Structured + unstructured, multi-source</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-stone-900">Output</td>
                <td className="p-4 text-stone-600">Static reports/graphs</td>
                <td className="p-4 font-bold text-amber-900">Real-time, explainable actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#e6e4df] py-8 px-4 text-center text-xs text-stone-500 font-mono font-semibold">
        <p>Citadel SaaS Factory • AI-Powered Business Intelligence and Decision Support System v3.1</p>
      </footer>
    </div>
  );
}
