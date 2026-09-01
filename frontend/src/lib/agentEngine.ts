import { 
  AgentId, 
  SKUItem, 
  SalesRecord, 
  ExpenseRecord, 
  CustomerFeedback, 
  MarketSignal,
  AgentInsight,
  StrategicRecommendation,
  MultiAgentReasoningStep,
  ChatMessage
} from './types';

export function calculateBusinessHealthScore(
  skus: SKUItem[], 
  sales: SalesRecord[], 
  expenses: ExpenseRecord[], 
  feedbacks: CustomerFeedback[]
): number {
  let score = 100;
  
  // Stockout penalty
  const criticalSkus = skus.filter(s => s.status === 'critical').length;
  score -= criticalSkus * 8;

  // Sales target penalty
  const currentMonthSales = sales[sales.length - 1];
  if (currentMonthSales && currentMonthSales.revenue < currentMonthSales.target) {
    const deficitRatio = (currentMonthSales.target - currentMonthSales.revenue) / currentMonthSales.target;
    score -= Math.round(deficitRatio * 25);
  }

  // Expense overrun penalty
  const overBudgetExpenses = expenses.filter(e => e.status === 'over_budget').length;
  score -= overBudgetExpenses * 6;

  // Negative customer feedback penalty
  const negativeFeedbacks = feedbacks.filter(f => f.sentiment === 'negative').length;
  score -= negativeFeedbacks * 4;

  return Math.max(30, Math.min(99, score));
}

export function generateAgentInsights(
  skus: SKUItem[],
  sales: SalesRecord[],
  expenses: ExpenseRecord[],
  feedbacks: CustomerFeedback[],
  signals: MarketSignal[]
): AgentInsight[] {
  const insights: AgentInsight[] = [];

  // 1. Sales Agent Insight
  const latestSales = sales[sales.length - 1];
  const targetDeficit = latestSales.target - latestSales.revenue;
  insights.push({
    id: 'ins-sales-1',
    agentId: 'sales',
    title: 'Monthly Revenue Target Variance (-23.4%)',
    summary: `August revenue ($39,800) missed target ($52,000) primarily due to stock depletion in top revenue driver SKU-884 and competitor price undercutting.`,
    detailedAnalysis: `Sales volume fell by 28% in the last 10 days of the month. Organic Roast Coffee (SKU-884) accounts for 42% of revenue shortfall.`,
    severity: 'high',
    timestamp: '10 mins ago',
    metrics: [
      { label: 'August Revenue', value: '$39,800', change: '-23.4% vs target' },
      { label: 'Orders Processed', value: '1,040', change: '-18.1% MoM' },
      { label: 'Avg Order Value', value: '$38.26', change: '+2.5%' }
    ],
    suggestedAction: {
      label: 'Run 10% Loyalty Flash Campaign on Tumblers',
      actionType: 'discount',
      payload: { targetCategory: 'Drinkware' }
    }
  });

  // 2. Inventory Agent Insight
  const criticalCount = skus.filter(s => s.status === 'critical').length;
  insights.push({
    id: 'ins-inv-1',
    agentId: 'inventory',
    title: `Critical Stockout Alert (${criticalCount} SKUs < 4 Days Stock)`,
    summary: `SKU-884 (42 units left, 3 days) & SKU-990 (18 units left, 4 days) are on track to completely exhaust inventory before next scheduled restock.`,
    detailedAnalysis: `Daily depletion rate of SKU-884 surged to 14.2 units/day. Reorder lead time is 48 hours via air freight or 6 days via ground.`,
    severity: 'critical',
    timestamp: 'Just now',
    metrics: [
      { label: 'Stockout Risk SKUs', value: `${criticalCount} Items`, change: 'Action Required' },
      { label: 'Working Capital Locked in Dead Stock', value: '$2,808', change: '540 units SKU-405' },
      { label: 'Optimal EOQ Reorder', value: '250 units', change: 'SKU-884' }
    ],
    suggestedAction: {
      label: 'Execute Emergency Air-Freight Reorder',
      actionType: 'reorder',
      payload: { skuId: 'SKU-884', qty: 250 }
    }
  });

  // 3. Finance Agent Insight
  const overBudgetExp = expenses.find(e => e.status === 'over_budget');
  insights.push({
    id: 'ins-fin-1',
    agentId: 'finance',
    title: 'Express Logistics Expense Variance (+86% Over Budget)',
    summary: `Logistics expenses reached $8,400 against a $4,500 budget due to uncoordinated air freight orders and carrier surcharge hikes.`,
    detailedAnalysis: `Operating margin compressed to 18.2% (down from 26.5% in July). Net cash flow remains positive at $14,200, but liquidity buffer narrowed.`,
    severity: 'medium',
    timestamp: '25 mins ago',
    metrics: [
      { label: 'Logistics Cost Variance', value: '+$3,900', change: '+86% Over' },
      { label: '30-Day Liquidity Buffer', value: '$14,200', change: 'Safe (>10k min)' },
      { label: 'Gross Profit Margin', value: '41.8%', change: '-4.2%' }
    ],
    suggestedAction: {
      label: 'Consolidate Carrier SLA',
      actionType: 'cut_expense',
      payload: { expId: 'exp-101' }
    }
  });

  // 4. Customer Experience Agent Insight
  const negCount = feedbacks.filter(f => f.sentiment === 'negative').length;
  insights.push({
    id: 'ins-cust-1',
    agentId: 'customer',
    title: `WhatsApp Complaint Spike (${negCount} Unresolved Incidents)`,
    summary: `Negative sentiment reached 28% in WhatsApp conversations. Primary drivers are stockout delay notifications and shipping fee increases.`,
    detailedAnalysis: `Key keyphrase extracted: "delayed shipment", "out of stock", "shipping fee jump". 3 VIP wholesale clients flagged high churn risk.`,
    severity: 'high',
    timestamp: '1 hour ago',
    metrics: [
      { label: 'CSAT Score', value: '78 / 100', change: '-8 pts' },
      { label: 'WhatsApp Negative Sentiment', value: '28%', change: '+12%' },
      { label: 'High Risk VIP Accounts', value: '3 Clients', change: 'Alert' }
    ],
    suggestedAction: {
      label: 'Send Priority Stock Guarantee to VIP Clients',
      actionType: 'contact_customer',
      payload: { clientIds: ['Café Bella', 'Artisan Bistro'] }
    }
  });

  // 5. Market Research Agent Insight
  const priceSignal = signals.find(s => s.category === 'competitor_pricing');
  insights.push({
    id: 'ins-mkt-1',
    agentId: 'market',
    title: 'Competitor Price Cut Detected (UrbanBrew -20%)',
    summary: `Main competitor UrbanBrew launched a promotional rate of $27.60/kg on roasted coffee beans, undercutting our $34.50 listing.`,
    detailedAnalysis: `Web crawler detected promotion running through Sept 10. Raw Arabica commodity futures also rose +14% due to weather disruptions.`,
    severity: 'medium',
    timestamp: '3 hours ago',
    metrics: [
      { label: 'UrbanBrew Price', value: '$27.60 / kg', change: '-20% Flash' },
      { label: 'Raw Commodity Index', value: 'Arabica +14%', change: 'Cost Pressure' },
      { label: 'Office Category Demand', value: '+28%', change: 'Positive Tailwind' }
    ],
    suggestedAction: {
      label: 'Match Promo with Value Bundle',
      actionType: 'adjust_price',
      payload: { category: 'Coffee' }
    }
  });

  return insights;
}

export function processNaturalLanguageQuery(
  query: string,
  skus: SKUItem[],
  sales: SalesRecord[],
  expenses: ExpenseRecord[],
  feedbacks: CustomerFeedback[],
  signals: MarketSignal[]
): ChatMessage {
  const normalized = query.toLowerCase();
  const reasoningSteps: MultiAgentReasoningStep[] = [];
  let finalAnswer = "";
  let participatingAgents: AgentId[] = [];
  let keyDataPoints: { label: string; value: string }[] = [];
  let suggestedActions: { label: string; actionType: string; payload: Record<string, any> }[] = [];

  // Timestamp format helper
  const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (normalized.includes('sales') && (normalized.includes('drop') || normalized.includes('fell') || normalized.includes('why') || normalized.includes('month'))) {

    participatingAgents = ['sales', 'inventory', 'market', 'orchestrator'];

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'data_ingestion',
      thought: 'Query received regarding August sales contraction ($39.8k vs $52k target). Decomposing query into Commercial Sales Analytics, Inventory Availability, and Competitor Pricing.',
      dataCited: ['August Revenue: $39,800', 'Target: $52,000', 'Deficit: -$12,200'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'sales',
      agentName: 'Sales Intelligence Agent',
      phase: 'domain_analysis',
      thought: 'Analyzed transaction logs. Organic Roast Coffee (SKU-884) experienced a 44% drop in weekly order volume during the final 10 days of August, causing 68% of total revenue shortfall.',
      dataCited: ['SKU-884 Orders: -44%', 'AOV: $38.26', 'Channel POS: -22%'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'inventory',
      agentName: 'Inventory Operations Agent',
      phase: 'domain_analysis',
      thought: 'Cross-referenced inventory depletion records. SKU-884 stock fell below minimum safety threshold (100 units) on Aug 21, resulting in stockouts and unfulfilled cart abandonments.',
      dataCited: ['SKU-884 Current Stock: 42 units', 'Depletion: 14.2 units/day', 'Stockout Date: 3 Days'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'market',
      agentName: 'Market Intelligence Agent',
      phase: 'domain_analysis',
      thought: 'Scanned competitor positioning. Direct rival UrbanBrew introduced a 20% flash discount ($27.60/kg) on Aug 24, diverting price-sensitive wholesale buyers.',
      dataCited: ['UrbanBrew Price: $27.60', 'Our Price: $34.50', 'Market Share Drag: ~8%'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'final_synthesis',
      thought: 'Synthesized multi-agent inputs. Primary root cause of sales drop is a combination of inventory stockouts for SKU-884 (+68% impact) and competitor price undercut (+32% impact). Resolving by recommending an emergency air-freight reorder coupled with a loyalty customer outreach.',
      dataCited: ['Combined Deficit Root Cause Identified', 'Action Plan Generated'],
      timestamp: nowStr
    });

    finalAnswer = `Sales dropped in August primarily due to a **$12,200 deficit against target**, driven by two converging factors:\n\n1. **Stockout in Top Revenue Driver (SKU-884)**: Organic Roast Coffee stock fell to 42 units (only 3 days left), causing a 44% drop in order completion during the last 10 days of August.\n2. **Competitor Flash Discount**: Rival brand UrbanBrew launched a 20% price promotion ($27.60/kg vs our $34.50/kg), capturing price-sensitive commercial accounts.\n\n**Recommended Strategic Response**:\n- Issue emergency expedited air-freight PO for 250 units of SKU-884.\n- Launch a targeted 10% bundle incentive for wholesale subscribers.`;

    keyDataPoints = [
      { label: 'August Revenue', value: '$39,800 (-23.4%)' },
      { label: 'SKU-884 Stock Remaining', value: '42 Units (3 Days)' },
      { label: 'Competitor Price Difference', value: '+$6.90 / kg' }
    ];

    suggestedActions = [
      { label: 'Issue Expedited Reorder PO ($4,000)', actionType: 'reorder', payload: { skuId: 'SKU-884', qty: 250 } },
      { label: 'Launch Wholesale Loyalty Offer', actionType: 'discount', payload: { targetCategory: 'Beverages' } }
    ];
  } 
  else if (normalized.includes('stockout') || (normalized.includes('stock') && (normalized.includes('out') || normalized.includes('next week') || normalized.includes('deplet')))) {
    participatingAgents = ['inventory', 'sales', 'finance', 'orchestrator'];

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'data_ingestion',
      thought: 'Evaluating 7-day SKU stock depletion models and supplier lead time constraints across all active SKUs.',
      dataCited: ['Active SKUs Analyzed: 6', 'Depletion Window: 7 Days'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'inventory',
      agentName: 'Inventory Operations Agent',
      phase: 'domain_analysis',
      thought: 'Predictive algorithm flagged 2 SKUs reaching zero balance within 7 days: SKU-884 (Organic Coffee, 3 days left) and SKU-990 (Wireless Earbuds, 4 days left). SKU-771 (Bamboo Desk Stand) is also at low safety stock level (16 days left).',
      dataCited: ['SKU-884: 3 Days Stock', 'SKU-990: 4 Days Stock', 'SKU-771: 16 Days Stock'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'sales',
      agentName: 'Sales Intelligence Agent',
      phase: 'domain_analysis',
      thought: 'Cross-checked demand velocity. SKU-884 accounts for $1,450 daily revenue. A stockout over 7 days will result in $10,150 in forfeited sales.',
      dataCited: ['SKU-884 Daily Revenue: $1,450', 'SKU-990 Daily Revenue: $338'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'finance',
      agentName: 'Finance & Liquidity Agent',
      phase: 'domain_analysis',
      thought: 'Checked liquidity balance. Cash buffer of $14,200 is available to cover combined PO expenditures of $7,360 for SKU-884 and SKU-990 without breaching minimum cash safety threshold ($10,000).',
      dataCited: ['Available Liquidity: $14,200', 'Required PO Cash: $7,360', 'Post-PO Buffer: $6,840'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'final_synthesis',
      thought: 'Synthesized Inventory risk with Sales revenue impact and Finance liquidity. Prioritizing immediate PO release for SKU-884 and SKU-990.',
      dataCited: ['Reorder Authorization Ready', 'Zero Cash Bottleneck'],
      timestamp: nowStr
    });

    finalAnswer = `Based on predictive depletion analysis, **2 key products are guaranteed to go out of stock next week** if no purchase order is issued immediately:\n\n1. **Organic Roast Coffee Beans (SKU-884)**:\n   - Current Stock: **42 units** | Depletion Rate: **14.2 units/day**\n   - Estimated Stockout Date: **3 Days (Thursday)**\n   - Projected Revenue At Risk: **$10,150** over next 7 days.\n\n2. **Wireless Bluetooth Noise Earbuds (SKU-990)**:\n   - Current Stock: **18 units** | Depletion Rate: **3.8 units/day**\n   - Estimated Stockout Date: **4 Days (Friday)**\n   - Projected Revenue At Risk: **$2,360**.\n\n**Executive Action Plan**:\n- Release Purchase Order PO-2026-884 ($4,000) for 250 coffee units.\n- Release Purchase Order PO-2026-990 ($3,360) for 80 earbud units.`;

    keyDataPoints = [
      { label: 'Critical Stockout SKUs', value: '2 Items (SKU-884 & 990)' },
      { label: 'Combined Revenue at Risk', value: '$12,510' },
      { label: 'Required Reorder Capital', value: '$7,360' }
    ];

    suggestedActions = [
      { label: 'Issue Dual PO (Coffee & Earbuds)', actionType: 'reorder', payload: { skus: ['SKU-884', 'SKU-990'] } },
      { label: 'View Inventory Depletion Matrix', actionType: 'navigate', payload: { tab: 'inventory' } }
    ];
  }
  else if (normalized.includes('expense') || normalized.includes('cost') || normalized.includes('reduce') || normalized.includes('liquidity')) {
    participatingAgents = ['finance', 'inventory', 'customer', 'orchestrator'];

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'data_ingestion',
      thought: 'Analyzing August expense ledgers, cost center variances, and tied-up working capital across all business units.',
      dataCited: ['Total August Overhead: $45,700', 'Budget Target: $39,200', 'Variance: +$6,500'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'finance',
      agentName: 'Finance & Liquidity Agent',
      phase: 'domain_analysis',
      thought: 'Identified 2 primary areas of compressible expense overruns: Logistics Express Surcharges (+$3,900 over budget) and Digital Marketing PPC Campaigns (+$2,500 over budget with lower ROAS).',
      dataCited: ['Logistics Surcharge: $8,400 spent vs $4,500 budget', 'PPC Spend: $9,500 spent vs $7,000 budget'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'inventory',
      agentName: 'Inventory Operations Agent',
      phase: 'domain_analysis',
      thought: 'Highlighted non-operating tied-up capital. 540 units of dead stock SKU-405 (Eco Tote Bags) are holding $2,808 in stagnant inventory value with zero turnover for 140 days.',
      dataCited: ['SKU-405 Stagnant Capital: $2,808', 'Warehouse Holding Cost: $420/mo'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'final_synthesis',
      thought: 'Synthesized cost reduction plan yielding up to $9,208 in immediate cash flow recovery without impacting core revenue generation.',
      dataCited: ['Combined Recoverable Capital: $9,208'],
      timestamp: nowStr
    });

    finalAnswer = `The virtual management team identified **3 immediate cost optimization opportunities** to recover up to **$9,208 in liquidity**:\n\n1. **Renegotiate Express Logistics Carriers (-$3,900/month)**:\n   - Logistics cost reached $8,400 (+$3,900 over budget) due to ad-hoc air shipments.\n   - Action: Shift non-urgent restocking to consolidated 3-day ground freight.\n\n2. **Optimize PPC Marketing Ad Spend (-$2,500/month)**:\n   - Ad spend reached $9,500 with diminishing ROAS on cold audience campaigns.\n   - Action: Pause broad Meta ad sets and redirect focus to email retargeting.\n\n3. **Liquidate Dead Stock SKU-405 (Reclaim $2,808 Cash)**:\n   - 540 Eco-Cotton Tote Bags have been stagnant for 140+ days.\n   - Action: Run a 50% flash clearance bundle with popular drinkware items.`;

    keyDataPoints = [
      { label: 'Total Recoverable Capital', value: '$9,208' },
      { label: 'Logistics Cost Overrun', value: '+$3,900 (+86%)' },
      { label: 'Stagnant Working Capital', value: '$2,808 (540 units)' }
    ];

    suggestedActions = [
      { label: 'Cap Logistics Surcharge Budget', actionType: 'cut_expense', payload: { expenseId: 'exp-101' } },
      { label: 'Launch Dead Stock Flash Bundle', actionType: 'discount', payload: { skuId: 'SKU-405' } }
    ];
  }
  else if (normalized.includes('whatsapp') || normalized.includes('complaint') || normalized.includes('customer') || normalized.includes('feedback')) {
    participatingAgents = ['customer', 'sales', 'inventory', 'orchestrator'];

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'data_ingestion',
      thought: 'Parsing unstructured customer message logs from WhatsApp Business API, email tickets, and Google Reviews.',
      dataCited: ['Parsed Messages: 1,240', 'Negative Feedback Ratio: 28%', 'Unresolved Alerts: 5'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'customer',
      agentName: 'Customer Experience Agent',
      phase: 'domain_analysis',
      thought: 'NLP Sentiment model extracted top recurring complaint clusters: 54% relate to delayed shipping deliveries, 31% relate to stockout cancellations on coffee orders, and 15% relate to courier fee increases.',
      dataCited: ['Shipping Delays Cluster: 54%', 'Stockout Cancellations: 31%', 'Price Surprises: 15%'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'inventory',
      agentName: 'Inventory Operations Agent',
      phase: 'domain_analysis',
      thought: 'Correlated complaint timestamps with inventory log. 80% of WhatsApp complaints occurred between Aug 25-28, coinciding directly with the stockout of SKU-884.',
      dataCited: ['Correlation Factor: 0.92', 'Impacted VIP Accounts: 3 Commercial Clients'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'final_synthesis',
      thought: 'Root cause confirmed: WhatsApp complaints are not caused by product quality issues, but rather operational stockouts and unannounced courier price changes. Recommending direct account manager outreach.',
      dataCited: ['Operational Root Cause Verified', 'Outreach Strategy Formulated'],
      timestamp: nowStr
    });

    finalAnswer = `Analysis of **1,240 customer interactions** reveals that the recent spike in WhatsApp complaints is driven by **operational fulfillment bottlenecks** rather than product defects:\n\n1. **Stockout Delivery Delays (54% of complaints)**:\n   - Wholesale accounts (including *Café Bella* and *Artisan Bistro*) reported unexpected 3-day delivery delays due to SKU-884 stockouts.\n\n2. **Courier Shipping Fee Surprises (31% of complaints)**:\n   - Customers noted shipping fees jumping from $12 to $28 without prior checkout disclosure.\n\n3. **Unfulfilled Web Reorders (15% of complaints)**:\n   - Out-of-stock messages triggered back-and-forth WhatsApp inquiries.\n\n**Action Plan to Restore Customer Retention**:\n- Send personalized apology & status updates to 3 flagged commercial clients with a 15% credit voucher on their next order.\n- Enable automated WhatsApp tracking notifications for dispatched orders.`;

    keyDataPoints = [
      { label: 'Primary Complaint Driver', value: 'Fulfillment Delays (54%)' },
      { label: 'WhatsApp Negative Sentiment', value: '28% (+12% MoM)' },
      { label: 'Impacted Key Accounts', value: '3 Commercial Clients' }
    ];

    suggestedActions = [
      { label: 'Dispatch VIP Apology & Voucher', actionType: 'contact_customer', payload: { clientIds: ['Café Bella', 'Artisan Bistro'] } },
      { label: 'View Customer Feedback Stream', actionType: 'navigate', payload: { tab: 'customer' } }
    ];
  }
  else {
    // Custom query handling
    participatingAgents = ['sales', 'inventory', 'finance', 'customer', 'market', 'orchestrator'];

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'data_ingestion',
      thought: `Parsing custom natural language query: "${query}". Initiating multi-agent scan across commercial metrics, operational stock levels, and ledger accounts.`,
      dataCited: ['Heterogeneous Data Sources Scanned', 'Context Model Updated'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'sales',
      agentName: 'Sales Intelligence Agent',
      phase: 'domain_analysis',
      thought: 'Scanned commercial database. Revenue stands at $39,800 with 1,040 orders processed. Top category is Beverages (48% share).',
      dataCited: ['Revenue: $39,800', 'Top Category: Beverages'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'inventory',
      agentName: 'Inventory Operations Agent',
      phase: 'domain_analysis',
      thought: 'Evaluated stock health. 2 critical SKUs identified (SKU-884, SKU-990). Dead stock working capital stands at $2,808.',
      dataCited: ['Critical SKUs: 2', 'Dead Stock: $2,808'],
      timestamp: nowStr
    });

    reasoningSteps.push({
      agentId: 'orchestrator',
      agentName: 'Decision Support Agent (COO)',
      phase: 'final_synthesis',
      thought: 'Synthesized custom query answer grounded in active operational state.',
      dataCited: ['Executive Insights Ready'],
      timestamp: nowStr
    });

    finalAnswer = `Here is the multi-agent analysis for your query: **"${query}"**\n\n- **Commercial Health**: August revenue is **$39,800** (-23.4% vs target), with Beverages holding the highest category market share.\n- **Operational Constraints**: SKU-884 (Coffee Beans) has only **3 days of stock remaining** (42 units).\n- **Financial Position**: Liquidity buffer is healthy at **$14,200**, though express freight expenses ran **+$3,900 over budget**.\n- **Customer Sentiment**: WhatsApp complaints stand at **28% negative**, primarily due to shipping delay inquiries.\n\n*Would you like me to issue a specific reorder PO or run an expense reduction plan?*`;

    keyDataPoints = [
      { label: 'Current Revenue', value: '$39,800' },
      { label: 'Stockout Risk SKUs', value: '2 Items' },
      { label: 'Available Cash', value: '$14,200' }
    ];

    suggestedActions = [
      { label: 'Issue Reorder PO ($4,000)', actionType: 'reorder', payload: { skuId: 'SKU-884', qty: 250 } },
      { label: 'Review Executive Recommendations', actionType: 'navigate', payload: { tab: 'executive' } }
    ];
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'coo',
    queryText: query,
    reasoningSteps,
    finalAnswer,
    participatingAgents,
    keyDataPoints,
    suggestedActions,
    timestamp: nowStr
  };
}
