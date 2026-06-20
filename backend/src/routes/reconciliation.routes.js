import { Router } from 'express';
import { processReconciliation } from '../controllers/reconciliation.controller.js';

const router = Router();

router.post('/process', processReconciliation);

export default router;