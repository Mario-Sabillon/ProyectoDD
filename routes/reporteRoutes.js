import express from 'express';
import { 
getReporteEmpleadosSucursal,
getReporteAsistencia,
getReporteBitacora,
getReporteHistorialSucursales,
getSucursalesConEmpleados
} from '../controllers/reporteController.js';
import { authenticate, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Reporte de empleados por sucursal
router.get('/empleados-sucursal', authenticate, getReporteEmpleadosSucursal);

// Reporte de asistencias
router.get('/asistencias', authenticate, getReporteAsistencia);

// Reporte de bitácora (solo administradores)
router.get('/bitacora', authenticate, checkRole('administrador'), getReporteBitacora);

// Reporte de historial de cambios de sucursal
router.get('/historial-sucursales', authenticate, getReporteHistorialSucursales);

// Vista de sucursales con empleados
router.get('/sucursales-empleados', authenticate, getSucursalesConEmpleados);

export default router;