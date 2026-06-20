import { Router } from 'express';
import multer from 'multer';
import { processReconciliation, processReconciliationFiles } from '../controllers/reconciliation.controller.js';

const router = Router();

// Configure multer to use memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFields = upload.fields([
  { name: 'shopify', maxCount: 1 },
  { name: 'meta', maxCount: 1 },
  { name: 'erp', maxCount: 1 }
]);

// Route 1: For the Demo button (Accepts raw JSON body)
router.post('/process', processReconciliation);

// Route 2: For the Upload button (Accepts multipart file uploads)
router.post('/process-files', uploadFields, processReconciliationFiles);

export default router;