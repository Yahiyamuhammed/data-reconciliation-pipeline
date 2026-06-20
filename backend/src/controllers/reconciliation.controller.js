import { reconcileDataService, generateAiInsightsService } from '../services/reconciliation.service.js';

export const processReconciliation = async (req, res) => {
  try {
    const { shopify, meta, erp } = req.body;

    if (!shopify || !meta || !erp) {
      return res.status(400).json({ error: 'Missing mandatory source data arrays: shopify, meta, or erp.' });
    }

    // Run programmatic analytical reconciliation
    const reconciliationResult = reconcileDataService(shopify, meta, erp);

    // Pass analytical results to AI layer
    const aiInsight = generateAiInsightsService(reconciliationResult.summary);

    return res.status(200).json({
      summary: reconciliationResult.summary,
      aiInsight,
      orders: reconciliationResult.orders
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server operational breakdown.', details: error.message });
  }
};