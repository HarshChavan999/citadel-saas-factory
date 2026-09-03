export type AgentId = 
  | 'sales' 
  | 'inventory' 
  | 'finance' 
  | 'customer' 
  | 'market' 
  | 'orchestrator';

export interface AgentMetadata {
  id: AgentId;
  name: string;
  role: string;
  avatar: string;
  color: string;
  badgeBg: string;
  status: 'active' | 'analyzing' | 'idle' | 'warning';
  description: string;
  iconName: string;
  bossName?: string;
  bossTitle?: string;
  personality?: string;
  directQuote?: string;
}

export interface SKUItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  currentStock: number;
  minStockThreshold: number;
  reorderQuantity: number;
  dailyDepletionRate: number; // units per day
  daysUntilStockout: number;
  status: 'optimal' | 'low_stock' | 'critical' | 'dead_stock';
  supplier: string;
  lastRestockDate: string;
  workingCapitalLocked: number;
}

export interface SalesRecord {
  date: string;
  revenue: number;
  target: number;
  forecast: number;
  orders: number;
  avgOrderValue: number;
  topSKUId: string;
}

export interface ExpenseRecord {
  id: string;
  category: string;
  description: string;
  amount: number;
  budget: number;
  date: string;
  isRecurring: boolean;
  status: 'normal' | 'over_budget' | 'compressible';
}

export interface CustomerFeedback {
  id: string;
  channel: 'whatsapp' | 'email' | 'feedback_form' | 'google_review';
  customerName: string;
  date: string;
  message: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: 'shipping' | 'product_quality' | 'pricing' | 'support' | 'general';
  resolutionStatus: 'open' | 'flagged' | 'resolved';
}

export interface MarketSignal {
  id: string;
  source: string;
  topic: string;
  title: string;
  impactScore: number; // -5 to +5
  date: string;
  category: 'competitor_pricing' | 'supplier_cost' | 'macro_demand' | 'seasonality';
  summary: string;
}

export interface AgentInsight {
  id: string;
  agentId: AgentId;
  title: string;
  summary: string;
  detailedAnalysis: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  metrics: { label: string; value: string; change?: string }[];
  suggestedAction?: {
    label: string;
    actionType: 'reorder' | 'discount' | 'cut_expense' | 'contact_customer' | 'adjust_price';
    payload: Record<string, any>;
  };
}

export interface StrategicRecommendation {
  id: string;
  title: string;
  executiveSummary: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  confidenceScore: number; // 0 to 100
  participatingAgents: AgentId[];
  crossFunctionalConflictResolved?: string;
  actionPlan: string[];
  primaryAction: {
    label: string;
    actionType: 'reorder' | 'discount' | 'cut_expense' | 'contact_customer' | 'adjust_price';
    payload: Record<string, any>;
  };
  impactEstimate: {
    financial: string;
    timeframe: string;
    riskReduction: string;
  };
}

export interface MultiAgentReasoningStep {
  agentId: AgentId;
  agentName: string;
  phase: 'data_ingestion' | 'domain_analysis' | 'conflict_resolution' | 'final_synthesis';
  thought: string;
  dataCited: string[];
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system' | 'coo';
  queryText?: string;
  reasoningSteps?: MultiAgentReasoningStep[];
  finalAnswer?: string;
  participatingAgents?: AgentId[];
  keyDataPoints?: { label: string; value: string }[];
  suggestedActions?: {
    label: string;
    actionType: string;
    payload: Record<string, any>;
  }[];
  timestamp: string;
}

export interface DataSourceStatus {
  id: string;
  name: string;
  type: 'pos' | 'inventory_db' | 'accounting' | 'whatsapp' | 'email' | 'ecommerce';
  status: 'connected' | 'syncing' | 'offline';
  lastSync: string;
  recordCount: number;
  unstructured: boolean;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  collection?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
}

