import { reconcileDataService, generateAiInsightsService } from '../services/reconciliation.service.js';

// Controller 1: Handles the Demo Button (Raw JSON)
export const processReconciliation = async (req, res) => {
  try {
    const { shopify, meta, erp } = req.body;

    if (!shopify || !meta || !erp) {
      return res.status(400).json({ error: 'Missing mandatory source data arrays.' });
    }

    const reconciliationResult = reconcileDataService(shopify, meta, erp);
    const aiInsight = generateAiInsightsService(reconciliationResult.summary);

    return res.status(200).json({
      summary: reconciliationResult.summary,
      aiInsight,
      orders: reconciliationResult.orders
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.', details: error.message });
  }
};

// Controller 2: Handles the File Uploads (Multer Buffers)
export const processReconciliationFiles = async (req, res) => {
  try {
    if (!req.files || !req.files.shopify || !req.files.meta || !req.files.erp) {
      return res.status(400).json({ error: 'Missing required files. Please upload shopify, meta, and erp JSON files.' });
    }

    const parseFileBuffer = (fileObject) => {
      const fileData = fileObject[0].buffer.toString('utf-8');
      return JSON.parse(fileData);
    };

    let shopifyData, metaData, erpData;

    try {
      shopifyData = parseFileBuffer(req.files.shopify);
      metaData = parseFileBuffer(req.files.meta);
      erpData = parseFileBuffer(req.files.erp);
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid file format. Ensure all files are valid JSON.' });
    }

    const reconciliationResult = reconcileDataService(shopifyData, metaData, erpData);
    const aiInsight = generateAiInsightsService(reconciliationResult.summary);

    return res.status(200).json({
      summary: reconciliationResult.summary,
      aiInsight,
      orders: reconciliationResult.orders
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error during file processing.', details: error.message });
  }
};