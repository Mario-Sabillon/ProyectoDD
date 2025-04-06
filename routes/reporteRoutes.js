import express from 'express';
import { generarReporteAsistencias, generarReporteEmpleadosSucursal } from '../controllers/reporteController.js';

const router = express.Router();

router.get('/asistencias', generarReporteAsistencias);
router.get('/empleados/:sucursal_id', generarReporteEmpleadosSucursal);

export default router;
