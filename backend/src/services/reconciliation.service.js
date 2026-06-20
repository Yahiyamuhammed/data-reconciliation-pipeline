export const reconcileDataService = (shopifyData, metaData, erpData) => {
  const ordersMap = {};

  // Normalize and Map Shopify Data
  shopifyData.forEach(item => {
    const id = item.orderId || item.id;
    if (id) {
      ordersMap[id] = { ...ordersMap[id], shopifyRevenue: Number(item.revenue) || 0 };
    }
  });

  // Normalize and Map Meta Data
  metaData.forEach(item => {
    const id = item.orderId || item.id;
    if (id) {
      ordersMap[id] = { ...ordersMap[id], metaRevenue: Number(item.attributedRevenue || item.revenue) || 0 };
    }
  });

  // Normalize and Map ERP Data
  erpData.forEach(item => {
    const id = item.orderId || item.id;
    if (id) {
      ordersMap[id] = { ...ordersMap[id], erpRevenue: Number(item.revenue) || 0 };
    }
  });

  let totalDiscrepancies = 0;
  let totalOverAttributedRevenue = 0;
  const processedOrders = [];

  // Deterministic Reconciliation Engine
  Object.keys(ordersMap).forEach(orderId => {
    const order = ordersMap[orderId];
    const sRev = order.shopifyRevenue || 0;
    const mRev = order.metaRevenue || 0;
    const eRev = order.erpRevenue || 0;

    let isMismatch = false;
    let trustedRevenue = sRev;
    let strategy = 'All systems aligned';

    if (sRev !== mRev || sRev !== eRev) {
      isMismatch = true;
      totalDiscrepancies++;

      // Core rule: If transactional e-commerce matches financial ERP, Meta is over-attributing
      if (sRev === eRev) {
        trustedRevenue = sRev;
        strategy = 'Shopify & ERP match. Meta marketing platform is over-attributing.';
        if (mRev > sRev) {
          totalOverAttributedRevenue += (mRev - sRev);
        }
      } else {
        // Fallback: Trust corporate ledger (ERP) when Shopify fails
        trustedRevenue = eRev;
        strategy = 'ERP financial ledger prioritised due to transactional drift.';
      }
    }

    processedOrders.push({
      orderId,
      shopifyRevenue: sRev,
      metaRevenue: mRev,
      erpRevenue: eRev,
      isMismatch,
      trustedRevenue,
      strategy
    });
  });

  return {
    summary: {
      totalOrders: Object.keys(ordersMap).length,
      totalDiscrepancies,
      totalOverAttributedRevenue
    },
    orders: processedOrders
  };
};

// Simulated AI Insight generator using strict context to prevent hallucinations
export const generateAiInsightsService = (summary) => {
  const { totalOrders, totalDiscrepancies, totalOverAttributedRevenue } = summary;
  
  if (totalDiscrepancies === 0) {
    return "Data integrity across Shopify, Meta, and ERP is verified at 100%. Ad attribution metrics match internal billing systems completely.";
  }

  const percentageAffected = ((totalDiscrepancies / totalOrders) * 100).toFixed(1);

  return `Analysis reveals critical channel discrepancies. Out of ${totalOrders} parsed transactions, ${totalDiscrepancies} instances (${percentageAffected}%) demonstrate attribution drift. Meta Ads is currently over-reporting gross revenue metrics by $${totalOverAttributedRevenue.toLocaleString()}. Action required: Calibrate Meta pixel configurations to utilize severe server-side deduplication; marketing spend metrics are currently skewed, risking budget overallocation into underperforming funnels.`;
};