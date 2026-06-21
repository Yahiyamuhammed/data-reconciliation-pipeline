import { reconcileDataService, generateStaticAiInsight, generateLiveAiInsight } from '../services/reconciliation.service.js';

export const processReconciliation = async (req, res) => {
  try {
    const { shopify, meta, erp } = req.body;
    const result = reconcileDataService(shopify, meta, erp);
    
    // DEMO ROUTE: Uses the static, perfectly formatted response
    const aiInsight = generateStaticAiInsight(result.summary);

    return res.status(200).json({ summary: result.summary, aiInsight, orders: result.orders });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.', details: error.message });
  }
};

export const processReconciliationFiles = async (req, res) => {
  try {
    if (!req.files || !req.files.shopify || !req.files.meta || !req.files.erp) {
      return res.status(400).json({ error: 'Missing required files.' });
    }

    const parseFile = (fileObj) => JSON.parse(fileObj[0].buffer.toString('utf-8'));
    const result = reconcileDataService(parseFile(req.files.shopify), parseFile(req.files.meta), parseFile(req.files.erp));
    
    // UPLOAD ROUTE: Calls Gemini API dynamically
    const aiInsight = await generateLiveAiInsight(result.summary);

    return res.status(200).json({ summary: result.summary, aiInsight, orders: result.orders });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.', details: error.message });
  }
};