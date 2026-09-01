'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navbar } from '../../components/layout/Navbar';
import { ExecutiveSummaryView } from '../../components/dashboard/ExecutiveSummaryView';
import { SalesAgentView } from '../../components/dashboard/SalesAgentView';
import { InventoryAgentView } from '../../components/dashboard/InventoryAgentView';
import { FinanceAgentView } from '../../components/dashboard/FinanceAgentView';
import { CustomerAgentView } from '../../components/dashboard/CustomerAgentView';
import { MarketAgentView } from '../../components/dashboard/MarketAgentView';
import { MultiAgentChatConsole } from '../../components/dashboard/MultiAgentChatConsole';
import { DataIntegrationHub } from '../../components/dashboard/DataIntegrationHub';
import { ActionConfirmationModal } from '../../components/dashboard/ActionConfirmationModal';
import { AgentInspectorDrawer } from '../../components/dashboard/AgentInspectorDrawer';

import { 
  INITIAL_AGENTS, 
  INITIAL_DATA_SOURCES, 
  INITIAL_SKUS, 
  MONTHLY_SALES_HISTORY, 
  EXPENSE_LEDGER, 
  CUSTOMER_FEEDBACK_FEED, 
  MARKET_SIGNALS, 
  INITIAL_STRATEGIC_RECOMMENDATIONS 
} from '../../lib/mockData';
import { 
  calculateBusinessHealthScore, 
  generateAgentInsights, 
  processNaturalLanguageQuery 
} from '../../lib/agentEngine';
import { 
  SKUItem, 
  SalesRecord, 
  ExpenseRecord, 
  CustomerFeedback, 
  MarketSignal, 
  ChatMessage, 
  StrategicRecommendation,
  AgentMetadata 
} from '../../lib/types';
import { CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('executive');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalActionType, setModalActionType] = useState('');
  const [modalPayload, setModalPayload] = useState<Record<string, any>>({});

  const [inspectingAgent, setInspectingAgent] = useState<AgentMetadata | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Core Dynamic Datasets
  const [skus, setSkus] = useState<SKUItem[]>(INITIAL_SKUS);
  const [salesHistory, setSalesHistory] = useState<SalesRecord[]>(MONTHLY_SALES_HISTORY);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(EXPENSE_LEDGER);
  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>(CUSTOMER_FEEDBACK_FEED);
  const [signals, setSignals] = useState<MarketSignal[]>(MARKET_SIGNALS);
  const [dataSources, setDataSources] = useState(INITIAL_DATA_SOURCES);
  const [recommendations, setRecommendations] = useState<StrategicRecommendation[]>(INITIAL_STRATEGIC_RECOMMENDATIONS);

  // Initial Welcome Chat Message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'coo',
      finalAnswer: `Welcome back. Your **Virtual AI Management Team** is operational across 6 connected channels.\n\nKey highlights today:\n1. **Critical Stockout**: SKU-884 (Organic Roast Coffee) has only 42 units left (3 days stock).\n2. **Logistics Overrun**: Express freight expense is +86% over budget ($8,400 spent).\n\nSelect a preset query below or ask any custom question to inspect multi-agent reasoning.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        { label: 'Why have sales dropped this month?', actionType: 'query', payload: { query: 'Why have sales dropped this month?' } },
        { label: 'Which products will run out of stock next week?', actionType: 'query', payload: { query: 'Which products are likely to go out of stock next week?' } }
      ]
    }
  ]);

  // Health score calculation
  const healthScore = calculateBusinessHealthScore(skus, salesHistory, expenses, feedbacks);
  const activeInsights = generateAgentInsights(skus, salesHistory, expenses, feedbacks, signals);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInspectAgent = (agentId: string) => {
    const found = INITIAL_AGENTS.find(a => a.id === agentId);
    if (found) {
      setInspectingAgent(found);
      setIsDrawerOpen(true);
    }
  };

  const handleActionClick = (actionType: string, payload: any) => {
    if (actionType === 'navigate') {
      if (payload.tab) setActiveTab(payload.tab);
      return;
    }
    if (actionType === 'query') {
      if (payload.query) {
        handleSendMessage(payload.query);
        setActiveTab('chat');
      }
      return;
    }

    const titleMap: Record<string, string> = {
      reorder: `Issue Emergency Purchase Order for ${payload.skuId || 'SKU-884'}`,
      discount: `Activate 50% Flash Clearance Bundle on ${payload.skuId || 'SKU-405'}`,
      cut_expense: `Renegotiate Carrier SLA & Cap Express Freight Budget`,
      contact_customer: `Dispatch Priority Apology & Voucher to Wholesale Accounts`
    };

    setModalTitle(titleMap[actionType] || `Execute Strategic Action: ${actionType}`);
    setModalActionType(actionType);
    setModalPayload(payload || {});
    setIsModalOpen(true);
  };

  const handleConfirmExecuteAction = () => {
    const actionType = modalActionType;
    const payload = modalPayload;

    if (actionType === 'reorder') {
      const skuId = payload.skuId || 'SKU-884';
      const qty = payload.qty || 250;
      setSkus(prev => prev.map(s => s.id === skuId ? { ...s, currentStock: s.currentStock + qty, daysUntilStockout: Math.round((s.currentStock + qty) / s.dailyDepletionRate), status: 'optimal' } : s));
      setRecommendations(prev => prev.filter(r => r.id !== 'rec-001'));
      showToast(`Purchase Order issued! +${qty} units restocked for ${skuId}.`);
    } 
    else if (actionType === 'discount') {
      const skuId = payload.skuId || 'SKU-405';
      setSkus(prev => prev.map(s => s.id === skuId ? { ...s, workingCapitalLocked: Math.round(s.workingCapitalLocked * 0.3), status: 'optimal' } : s));
      setRecommendations(prev => prev.filter(r => r.id !== 'rec-002'));
      showToast(`Flash discount activated! Stagnant stock liquidated.`);
    }
    else if (actionType === 'cut_expense') {
      setExpenses(prev => prev.map(e => e.id === 'exp-101' ? { ...e, amount: 4500, status: 'normal' } : e));
      setRecommendations(prev => prev.filter(r => r.id !== 'rec-003'));
      showToast(`Carrier SLA updated. Express freight capped at $4,500.`);
    }
    else if (actionType === 'contact_customer') {
      setFeedbacks(prev => prev.map(f => ({ ...f, resolutionStatus: 'resolved' })));
      showToast(`Apology vouchers dispatched to wholesale clients via WhatsApp API.`);
    }
  };

  const handleSendMessage = (queryText: string) => {
    const newMessage = processNaturalLanguageQuery(queryText, skus, salesHistory, expenses, feedbacks, signals);
    setMessages(prev => [...prev, newMessage]);
    if (activeTab !== 'chat') setActiveTab('chat');
  };

  const handleTriggerSimulatedEvent = (eventType: string) => {
    if (eventType === 'sales_spike') {
      setSkus(prev => prev.map(s => s.id === 'SKU-884' ? { ...s, currentStock: Math.max(2, s.currentStock - 30), daysUntilStockout: 1, status: 'critical' } : s));
      showToast(`POS Event: +50 orders processed for SKU-884! Stock depleted.`);
    } 
    else if (eventType === 'whatsapp_complaint') {
      const newFb: CustomerFeedback = { id: `fb-${Date.now()}`, channel: 'whatsapp', customerName: 'Metro Coffee Hub', date: 'Just now', message: 'Where is our delivery?', sentiment: 'negative', category: 'shipping', resolutionStatus: 'open' };
      setFeedbacks(prev => [newFb, ...prev]);
      showToast(`Event: Urgent WhatsApp complaint received.`);
    } 
    else if (eventType === 'logistics_hike') {
      setExpenses(prev => prev.map(e => e.id === 'exp-101' ? { ...e, amount: e.amount + 2200, status: 'over_budget' } : e));
      showToast(`Event: Express freight surcharge +$2,200 logged.`);
    }
    else if (eventType === 'competitor_promo') {
      const newSig: MarketSignal = { id: `sig-${Date.now()}`, source: 'Crawler Alert', topic: 'Competitor Promo', title: 'Rival bean distributor slashed price by 25%', impactScore: -4, date: 'Today', category: 'competitor_pricing', summary: 'Under-cutting SKU-884 at $25.99/kg.' };
      setSignals(prev => [newSig, ...prev]);
      showToast(`Event: Market crawler detected 25% competitor price cut.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6] text-stone-900 font-sans selection:bg-amber-500/20 selection:text-amber-900">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-card px-4 py-3 rounded-xl border border-amber-600 bg-white shadow-2xl text-xs font-bold text-amber-950 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-amber-700" />
          <span>{toastMessage}</span>
        </div>
      )}


      {/* Action Confirmation Modal */}
      <ActionConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmExecuteAction}
        actionTitle={modalTitle}
        actionType={modalActionType}
        payload={modalPayload}
      />

      {/* Agent Inspector Drawer */}
      <AgentInspectorDrawer 
        agent={inspectingAgent}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Enterprise Collapsible Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        agents={INITIAL_AGENTS}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        healthScore={healthScore}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          agents={INITIAL_AGENTS}
          isLiveSimulating={isLiveSimulating}
          setIsLiveSimulating={setIsLiveSimulating}
          healthScore={healthScore}
        />

        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
          {activeTab === 'executive' && (
            <ExecutiveSummaryView 
              agents={INITIAL_AGENTS}
              recommendations={recommendations}
              insights={activeInsights}
              skus={skus}
              sales={salesHistory}
              expenses={expenses}
              feedbacks={feedbacks}
              healthScore={healthScore}
              onExecuteAction={handleActionClick}
              onNavigateToTab={(tab) => {
                if (['sales', 'inventory', 'finance', 'customer', 'market', 'orchestrator'].includes(tab)) {
                  handleInspectAgent(tab);
                } else {
                  setActiveTab(tab);
                }
              }}
            />
          )}

          {activeTab === 'sales' && (
            <SalesAgentView 
              salesHistory={salesHistory}
              skus={skus}
              onExecuteAction={handleActionClick}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryAgentView 
              skus={skus}
              onExecuteAction={handleActionClick}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceAgentView 
              expenses={expenses}
              onExecuteAction={handleActionClick}
            />
          )}

          {activeTab === 'customer' && (
            <CustomerAgentView 
              feedbacks={feedbacks}
              onExecuteAction={handleActionClick}
            />
          )}

          {activeTab === 'market' && (
            <MarketAgentView 
              signals={signals}
            />
          )}

          {activeTab === 'chat' && (
            <MultiAgentChatConsole 
              messages={messages}
              agents={INITIAL_AGENTS}
              onSendMessage={handleSendMessage}
              onExecuteAction={handleActionClick}
            />
          )}

          {activeTab === 'integrations' && (
            <DataIntegrationHub 
              dataSources={dataSources}
              onTriggerSimulatedEvent={handleTriggerSimulatedEvent}
            />
          )}
        </main>
      </div>
    </div>
  );
}
