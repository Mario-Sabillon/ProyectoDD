import express from 'express';
import { getHistorialEmpleado } from '../controllers/historialController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/empleado/:empleadoId', authenticate, getHistorialEmpleado);

export default router;