import express from 'express';
import { createEmpleado, getEmpleados } from '../controllers/empleadoController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createEmpleado);
router.get('/', authenticate, getEmpleados);

export default router;