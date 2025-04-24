import express from 'express';
import { getReporteBitacora } from '../controllers/reporteController.js';
import { authenticate, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, checkRole('administrador'), getReporteBitacora);

export default router;