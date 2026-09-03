import { 
  AgentMetadata, 
  SKUItem, 
  SalesRecord, 
  ExpenseRecord, 
  CustomerFeedback, 
  MarketSignal, 
  DataSourceStatus,
  StrategicRecommendation,
  AgentInsight
} from './types';

export const INITIAL_AGENTS: AgentMetadata[] = [
  {
    id: 'orchestrator',
    name: 'Arthur Pendelton',
    role: 'Chief Operating Officer (COO)',
    avatar: '👔',
    color: 'from-amber-600 to-orange-700',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    status: 'active',
    description: 'Executive Roundtable Lead. Synthesizes cross-functional tradeoffs, eliminates bottlenecks, and delivers honest operational execution.',
    iconName: 'ShieldCheck',
    bossName: 'Arthur Pendelton',
    bossTitle: 'Chief Operating Officer',
    personality: 'Pragmatic, direct, outcome-focused',
    directQuote: '"Let\'s look at the raw numbers and make the tough call today."'
  },
  {
    id: 'sales',
    name: 'Sarah Jenkins',
    role: 'VP of Commercial Sales & Revenue',
    avatar: '👩‍💼',
    color: 'from-emerald-600 to-teal-700',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    status: 'active',
    description: 'Drives commercial revenue velocity, tracks product demand trends, and protects average order values.',
    iconName: 'TrendingUp',
    bossName: 'Sarah Jenkins',
    bossTitle: 'VP of Sales & Revenue',
    personality: 'Energetic, growth-obsessed, customer-centric',
    directQuote: '"Revenue fell because our top coffee seller went out of stock. We need inventory now!"'
  },
  {
    id: 'inventory',
    name: 'Marcus Vance',
    role: 'Director of Supply Chain & Logistics',
    avatar: '👨‍💼',
    color: 'from-orange-600 to-amber-700',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    status: 'warning',
    description: 'Warehouse & supply chain controller. Computes EOQ reorders, tracks safety lead times, and flags stockouts.',
    iconName: 'Boxes',
    bossName: 'Marcus Vance',
    bossTitle: 'Supply Chain Director',
    personality: 'No-nonsense, blunt warehouse veteran',
    directQuote: '"We only have 42 units left in the warehouse! If we don\'t reorder today, we hit zero on Thursday."'
  },
  {
    id: 'finance',
    name: 'Victor Thorne',
    role: 'Chief Financial Officer (CFO)',
    avatar: '💼',
    color: 'from-indigo-600 to-purple-700',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    status: 'active',
    description: 'Financial hawk protecting net cash buffer, gross margins, and auditing budget variance overruns.',
    iconName: 'Wallet',
    bossName: 'Victor Thorne',
    bossTitle: 'Chief Financial Officer',
    personality: 'Sharp, disciplined, risk-conscious',
    directQuote: '"Express freight surcharges blew +$3,900 over budget. We must cap logistics expenses immediately."'
  },
  {
    id: 'customer',
    name: 'Elena Rostova',
    role: 'VP of Customer Success & Retention',
    avatar: '👩‍💻',
    color: 'from-purple-600 to-pink-700',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    status: 'warning',
    description: 'Customer voice lead. Parses unstructured WhatsApp chats & email tickets to protect VIP wholesale accounts.',
    iconName: 'MessageSquare',
    bossName: 'Elena Rostova',
    bossTitle: 'VP of Customer Experience',
    personality: 'Empathetic, firm, advocate for VIP accounts',
    directQuote: '"Café Bella & Artisan Bistro are furious about stockout delays. We need to send apology vouchers today."'
  },
  {
    id: 'market',
    name: 'David Sterling',
    role: 'Chief Market Officer & Strategy Scout',
    avatar: '🌐',
    color: 'from-blue-600 to-cyan-700',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    status: 'active',
    description: 'Scouts competitor pricing moves, raw material commodity trends, and macroeconomic category tailwinds.',
    iconName: 'Globe',
    bossName: 'David Sterling',
    bossTitle: 'Chief Market Strategist',
    personality: 'Analytical, strategic, sharp market scout',
    directQuote: '"UrbanBrew slashed prices by 20%. We must respond with a targeted loyalty bundle."'
  }
];

export const INITIAL_DATA_SOURCES: DataSourceStatus[] = [
  { id: 'ds-pos', name: 'Square POS & Cash Ledger', type: 'pos', status: 'connected', lastSync: '2 mins ago', recordCount: 14200, unstructured: false },
  { id: 'ds-inv', name: 'WMS Central Inventory DB', type: 'inventory_db', status: 'connected', lastSync: '1 min ago', recordCount: 450, unstructured: false },
  { id: 'ds-acc', name: 'QuickBooks Ledger & Payroll', type: 'accounting', status: 'connected', lastSync: '15 mins ago', recordCount: 3890, unstructured: false },
  { id: 'ds-wa', name: 'WhatsApp Business Support Line', type: 'whatsapp', status: 'syncing', lastSync: 'Just now', recordCount: 1240, unstructured: true },
  { id: 'ds-email', name: 'Customer Service Support Desk', type: 'email', status: 'connected', lastSync: '5 mins ago', recordCount: 890, unstructured: true },
  { id: 'ds-ecom', name: 'Shopify Storefront Connector', type: 'ecommerce', status: 'connected', lastSync: '3 mins ago', recordCount: 8750, unstructured: false }
];

export const INITIAL_SKUS: SKUItem[] = [
  {
    id: 'SKU-884',
    name: 'Organic Roast Coffee Beans (1kg)',
    category: 'Beverages',
    price: 34.50,
    cost: 16.00,
    currentStock: 42,
    minStockThreshold: 100,
    reorderQuantity: 250,
    dailyDepletionRate: 14.2,
    daysUntilStockout: 3,
    status: 'critical',
    supplier: 'Highland Farms Coffee Co.',
    lastRestockDate: '2026-08-12',
    workingCapitalLocked: 672
  },
  {
    id: 'SKU-102',
    name: 'Thermal Stainless Tumbler 500ml',
    category: 'Drinkware',
    price: 24.99,
    cost: 8.50,
    currentStock: 310,
    minStockThreshold: 80,
    reorderQuantity: 150,
    dailyDepletionRate: 6.5,
    daysUntilStockout: 47,
    status: 'optimal',
    supplier: 'Pacific Steel Mfg.',
    lastRestockDate: '2026-08-20',
    workingCapitalLocked: 2635
  },
  {
    id: 'SKU-405',
    name: 'Eco-Cotton Heavy Tote Bag',
    category: 'Apparel',
    price: 18.00,
    cost: 5.20,
    currentStock: 540,
    minStockThreshold: 150,
    reorderQuantity: 200,
    dailyDepletionRate: 0.8,
    daysUntilStockout: 675,
    status: 'dead_stock',
    supplier: 'GreenTextiles Ltd.',
    lastRestockDate: '2026-04-10',
    workingCapitalLocked: 2808
  },
  {
    id: 'SKU-771',
    name: 'Ergonomic Bamboo Desk Stand',
    category: 'Office',
    price: 69.99,
    cost: 28.00,
    currentStock: 68,
    minStockThreshold: 50,
    reorderQuantity: 100,
    dailyDepletionRate: 4.1,
    daysUntilStockout: 16,
    status: 'low_stock',
    supplier: 'Nordic Artisan Woodcraft',
    lastRestockDate: '2026-08-01',
    workingCapitalLocked: 1904
  },
  {
    id: 'SKU-312',
    name: 'Organic Chamomile Tea Box (50s)',
    category: 'Beverages',
    price: 14.50,
    cost: 4.80,
    currentStock: 195,
    minStockThreshold: 60,
    reorderQuantity: 150,
    dailyDepletionRate: 8.4,
    daysUntilStockout: 23,
    status: 'optimal',
    supplier: 'Highland Farms Coffee Co.',
    lastRestockDate: '2026-08-18',
    workingCapitalLocked: 936
  },
  {
    id: 'SKU-990',
    name: 'Wireless Bluetooth Noise Earbuds',
    category: 'Electronics',
    price: 89.00,
    cost: 42.00,
    currentStock: 18,
    minStockThreshold: 40,
    reorderQuantity: 80,
    dailyDepletionRate: 3.8,
    daysUntilStockout: 4,
    status: 'critical',
    supplier: 'Shenzhen MicroTech Ltd.',
    lastRestockDate: '2026-07-25',
    workingCapitalLocked: 756
  }
];

export const MONTHLY_SALES_HISTORY: SalesRecord[] = [
  { date: '2026-03', revenue: 42500, target: 40000, forecast: 41000, orders: 1120, avgOrderValue: 37.94, topSKUId: 'SKU-884' },
  { date: '2026-04', revenue: 48900, target: 42000, forecast: 45000, orders: 1290, avgOrderValue: 37.90, topSKUId: 'SKU-884' },
  { date: '2026-05', revenue: 51200, target: 45000, forecast: 49000, orders: 1380, avgOrderValue: 37.10, topSKUId: 'SKU-771' },
  { date: '2026-06', revenue: 46800, target: 48000, forecast: 50000, orders: 1210, avgOrderValue: 38.67, topSKUId: 'SKU-102' },
  { date: '2026-07', revenue: 54100, target: 50000, forecast: 52000, orders: 1450, avgOrderValue: 37.31, topSKUId: 'SKU-884' },
  { date: '2026-08', revenue: 39800, target: 52000, forecast: 55000, orders: 1040, avgOrderValue: 38.26, topSKUId: 'SKU-884' },
];

export const EXPENSE_LEDGER: ExpenseRecord[] = [
  { id: 'exp-101', category: 'Logistics & Express Freight', description: 'Emergency air freight surcharge due to shipping delays', amount: 8400, budget: 4500, date: '2026-08-25', isRecurring: false, status: 'over_budget' },
  { id: 'exp-102', category: 'Warehousing & Storage', description: 'Monthly space rental at Regional Hub B', amount: 6200, budget: 6200, date: '2026-08-01', isRecurring: true, status: 'normal' },
  { id: 'exp-103', category: 'Digital Marketing & Ads', description: 'Meta & Google PPC Campaigns', amount: 9500, budget: 7000, date: '2026-08-15', isRecurring: true, status: 'compressible' },
  { id: 'exp-104', category: 'Software & SaaS Tools', description: 'Cloud ERP, CRM & Communication Stack', amount: 3100, budget: 3000, date: '2026-08-05', isRecurring: true, status: 'normal' },
  { id: 'exp-105', category: 'Staff Payroll & Benefits', description: 'Operational & Warehouse staff salary', amount: 18500, budget: 18500, date: '2026-08-28', isRecurring: true, status: 'normal' },
];

export const CUSTOMER_FEEDBACK_FEED: CustomerFeedback[] = [
  {
    id: 'fb-301',
    channel: 'whatsapp',
    customerName: 'Marcus Vance (Café Bella)',
    date: '2026-08-30 14:22',
    message: 'Hey team, our order for Organic Roast Coffee Beans (SKU-884) was delayed by 3 days and 2 bags were torn. We are running low on supply for our weekend rush!',
    sentiment: 'negative',
    category: 'shipping',
    resolutionStatus: 'flagged'
  },
  {
    id: 'fb-302',
    channel: 'email',
    customerName: 'Elena Rostova',
    date: '2026-08-29 11:05',
    message: 'The Ergonomic Bamboo Desk Stand arrived in perfect condition. Incredible craftsmanship! Will recommend to my team.',
    sentiment: 'positive',
    category: 'product_quality',
    resolutionStatus: 'resolved'
  },
  {
    id: 'fb-303',
    channel: 'whatsapp',
    customerName: 'David Chen',
    date: '2026-08-28 17:45',
    message: 'Why did shipping cost jump from $12 to $28 on my last wholesale order? If courier charges stay this high we will switch suppliers.',
    sentiment: 'negative',
    category: 'pricing',
    resolutionStatus: 'open'
  },
  {
    id: 'fb-304',
    channel: 'google_review',
    customerName: 'Sarah Jenkins',
    date: '2026-08-27 09:12',
    message: 'Great customer service rep resolved my order query within 10 minutes on WhatsApp.',
    sentiment: 'positive',
    category: 'support',
    resolutionStatus: 'resolved'
  },
  {
    id: 'fb-305',
    channel: 'whatsapp',
    customerName: 'Artisan Bistro',
    date: '2026-08-26 19:30',
    message: 'Tried to reorder SKU-884 but your website says Out of Stock. When will fresh stock arrive?',
    sentiment: 'negative',
    category: 'shipping',
    resolutionStatus: 'flagged'
  }
];

export const MARKET_SIGNALS: MarketSignal[] = [
  {
    id: 'sig-801',
    source: 'Global Coffee Index & Commodity Monitor',
    topic: 'Green Coffee Bean Wholesale Prices',
    title: 'Arabica raw coffee futures rise 14% due to South American drought',
    impactScore: -4,
    date: '2026-08-28',
    category: 'supplier_cost',
    summary: 'Supplier cost for SKU-884 is projected to increase by $2.40/kg starting next month. Margin reduction expected if retail price remains static.'
  },
  {
    id: 'sig-802',
    source: 'Competitor Web Crawler (UrbanBrew Direct)',
    topic: 'Competitor Pricing Promotion',
    title: 'UrbanBrew launched 20% flash discount on 1kg roasted coffee beans',
    impactScore: -3,
    date: '2026-08-29',
    category: 'competitor_pricing',
    summary: 'UrbanBrew is undercutting our price point ($27.60 vs our $34.50), causing temporary sales volume slowdown this week.'
  },
  {
    id: 'sig-803',
    source: 'Regional Retail Trends Report Q3',
    topic: 'Sustainable Office Products Demand',
    title: 'Surge of +28% demand for eco-friendly ergonomic workplace accessories',
    impactScore: +4,
    date: '2026-08-24',
    category: 'macro_demand',
    summary: 'Favorable tailwind for Bamboo Desk Stand (SKU-771). Demand expected to accelerate into September back-to-work season.'
  }
];

export const INITIAL_STRATEGIC_RECOMMENDATIONS: StrategicRecommendation[] = [
  {
    id: 'rec-001',
    title: 'CRITICAL: Expedite Emergency Reorder for Organic Roast Coffee Beans (SKU-884)',
    executiveSummary: 'Sales Agent predicts +34% demand surge, while Inventory Agent flags only 3 days of stock remaining (42 units). Meanwhile, Customer Experience Agent notes 3 wholesale accounts complaining of potential stockouts.',
    priority: 'CRITICAL',
    confidenceScore: 96,
    participatingAgents: ['sales', 'inventory', 'customer', 'orchestrator'],
    crossFunctionalConflictResolved: 'Conflict between Finance (holding cash) and Sales (demanding stock) resolved by recommending a split reorder of 250 units with 50% deposit terms.',
    actionPlan: [
      'Issue PO-2026-884 to Highland Farms for 250 units ($4,000 value).',
      'Select air-freight expedited batch (50 units) arriving in 48 hours.',
      'Send automated WhatsApp updates to Café Bella & Artisan Bistro promising delivery by Thursday.'
    ],
    primaryAction: {
      label: 'Approve & Issue Reorder PO ($4,000)',
      actionType: 'reorder',
      payload: { skuId: 'SKU-884', quantity: 250, supplier: 'Highland Farms Coffee Co.' }
    },
    impactEstimate: {
      financial: 'Prevents $4,830 lost revenue over next 14 days.',
      timeframe: '24-48 Hours execution',
      riskReduction: 'Eliminates 85% risk of major account churn.'
    }
  },
  {
    id: 'rec-002',
    title: 'HIGH: Liquidate Dead Stock (SKU-405) to Reclaim $2,808 Working Capital',
    executiveSummary: 'Inventory Agent identified 540 units of Eco-Cotton Tote Bags stagnant for 140+ days. Finance Agent notes cash flow pressure from logistics cost spikes.',
    priority: 'HIGH',
    confidenceScore: 89,
    participatingAgents: ['inventory', 'finance', 'sales', 'orchestrator'],
    crossFunctionalConflictResolved: 'Sales favored holding for full retail price ($18), but Finance & COO prioritized cash liquidity to cover upcoming payroll.',
    actionPlan: [
      'Bundle SKU-405 as a $5.00 add-on purchase with Thermal Tumbler (SKU-102).',
      'Offer 50% bulk discount to corporate gifting partners.',
      'Reinvest freed capital ($2,800) into high-margin inventory.'
    ],
    primaryAction: {
      label: 'Launch 50% Flash Clearance Bundle',
      actionType: 'discount',
      payload: { skuId: 'SKU-405', discountPercent: 50, bundleTargetSku: 'SKU-102' }
    },
    impactEstimate: {
      financial: 'Reclaims ~$2,100 cash within 15 days.',
      timeframe: 'Immediate rollout',
      riskReduction: 'Frees 12% warehouse shelf footprint.'
    }
  },
  {
    id: 'rec-003',
    title: 'MEDIUM: Renegotiate Logistics Carrier SLA to Reduce Shipping Surcharge',
    executiveSummary: 'Finance Agent flags 86% cost overrun in express freight ($8,400 spent vs $4,500 budget), while Customer Experience Agent notes rising customer complaints about high shipping fees.',
    priority: 'MEDIUM',
    confidenceScore: 91,
    participatingAgents: ['finance', 'customer', 'market', 'orchestrator'],
    actionPlan: [
      'Consolidate regional fulfillment with Regional Logistics Express.',
      'Implement dynamic shipping fee cap at checkout ($14.99 max).',
      'Shift non-urgent wholesale shipments to 3-day ground transport.'
    ],
    primaryAction: {
      label: 'Review & Optimize Logistics SLA',
      actionType: 'cut_expense',
      payload: { expenseId: 'exp-101', targetReduction: 3500 }
    },
    impactEstimate: {
      financial: 'Saves ~$3,900/month in shipping overhead.',
      timeframe: '7 Days',
      riskReduction: 'Improves customer CSAT by +14 points.'
    }
  }
];

export const PRESET_EXECUTIVE_QUERIES = [
  {
    query: "Why have sales dropped this month?",
    shortLabel: "Why sales dropped this month",
    iconName: "TrendingDown"
  },
  {
    query: "Which products are likely to go out of stock next week?",
    shortLabel: "Stockout predictions next week",
    iconName: "AlertTriangle"
  },
  {
    query: "What expenses can be reduced to improve liquidity?",
    shortLabel: "Expense reduction & cash flow",
    iconName: "DollarSign"
  },
  {
    query: "What is causing the increase in customer complaints on WhatsApp?",
    shortLabel: "WhatsApp complaint root cause",
    iconName: "MessageCircle"
  }
];
