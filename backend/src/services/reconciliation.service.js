import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Helper function to safely extract and format numerical revenue.
 */
const parseRevenue = (value) => Number(value) || 0;

/**
 * Helper function to extract a standardized order ID from varied source schemas.
 */
const extractOrderId = (item) => item.orderId || item.id;

/**
 * Core engine to reconcile transaction data across e-commerce, marketing, and financial systems.
 * * @param {Array} shopifyData - Transactional data from Shopify
 * @param {Array} metaData - Attribution data from Meta Ads
 * @param {Array} erpData - Financial ledger data from ERP
 * @returns {Object} Reconciliation summary and array of processed orders
 */
export const reconcileDataService = (shopifyData, metaData, erpData) => {
  const ordersMap = {};

  // 1. Ingest and normalize Shopify Data
  shopifyData.forEach((item) => {
    const id = extractOrderId(item);
    if (id) {
      ordersMap[id] = {
        ...ordersMap[id],
        shopifyRevenue: parseRevenue(item.revenue)
      };
    }
  });

  // 2. Ingest and normalize Meta Data
  metaData.forEach((item) => {
    const id = extractOrderId(item);
    if (id) {
      ordersMap[id] = {
        ...ordersMap[id],
        metaRevenue: parseRevenue(item.attributedRevenue || item.revenue)
      };
    }
  });

  // 3. Ingest and normalize ERP Data
  erpData.forEach((item) => {
    const id = extractOrderId(item);
    if (id) {
      ordersMap[id] = {
        ...ordersMap[id],
        erpRevenue: parseRevenue(item.revenue)
      };
    }
  });

  let totalDiscrepancies = 0;
  let totalOverAttributedRevenue = 0;
  const processedOrders = [];

  // 4. Execute Reconciliation Logic
  Object.keys(ordersMap).forEach((orderId) => {
    const order = ordersMap[orderId];
    
    const shopifyRev = order.shopifyRevenue || 0;
    const metaRev = order.metaRevenue || 0;
    const erpRev = order.erpRevenue || 0;

    let isMismatch = false;
    let trustedRevenue = shopifyRev;
    let reason = 'Systems Aligned';
    let confidence = 100;

    // Detect if any system disagrees
    if (shopifyRev !== metaRev || shopifyRev !== erpRev) {
      isMismatch = true;
      totalDiscrepancies++;

      // Rule A: Shopify and ERP match, meaning Meta is likely over-attributing
      if (shopifyRev === erpRev) {
        trustedRevenue = shopifyRev;
        reason = 'Shopify and ERP agree';
        confidence = 95;
        
        if (metaRev > shopifyRev) {
          totalOverAttributedRevenue += (metaRev - shopifyRev);
        }
      } 
      // Rule B: Complete mismatch, default to the financial source of truth (ERP)
      else {
        trustedRevenue = erpRev;
        reason = 'ERP priority over transactional mismatch';
        confidence = 80;
      }
    }

    processedOrders.push({
      orderId,
      shopifyRevenue: shopifyRev,
      metaRevenue: metaRev,
      erpRevenue: erpRev,
      isMismatch,
      trustedRevenue,
      confidence,
      reason
    });
  });

  const totalOrders = Object.keys(ordersMap).length;

  return {
    summary: { 
      totalOrders, 
      totalDiscrepancies, 
      totalOverAttributedRevenue 
    },
    orders: processedOrders
  };
};

/**
 * Generates a static, pre-formatted insight response for demonstration purposes.
 */
export const generateStaticAiInsight = (summary) => {
  return `**Insight:**
Meta Ads is currently over-reporting gross revenue metrics by $${summary.totalOverAttributedRevenue} across ${summary.totalDiscrepancies} transactions.

**Business Impact:**
Marketing ROI calculations may be inflated, causing the team to overestimate campaign performance and misallocate budget.

**Recommended Action:**
Validate Meta attribution settings against ERP records before increasing ad spend.`;
};

/**
 * Calls the Google Gemini API to generate dynamic insights based on live data summaries.
 */
export const generateLiveAiInsight = async (summary) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("AI_API_KEY is missing from environment. Falling back to static insight.");
    return generateStaticAiInsight(summary);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a senior data analyst. Review this dataset summary: 
      Total Orders: ${summary.totalOrders}
      Discrepancies: ${summary.totalDiscrepancies}
      Meta Over-Attribution: $${summary.totalOverAttributedRevenue}
      
      Write a brief report formatted exactly like this, using plain English:
      **Insight:** [1 sentence explanation]
      **Business Impact:** [1 sentence on ROI/marketing effect]
      **Recommended Action:** [1 sentence on what to do next]
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
    
  } catch (error) {
    console.error("Gemini AI Generation failed:", error.message);
    // Graceful fallback so the frontend doesn't crash if the API fails
    return generateStaticAiInsight(summary); 
  }
};