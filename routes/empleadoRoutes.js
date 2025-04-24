import express from 'express';
import { cambiarSucursal } from '../controllers/empleadoController.js';
import { authenticate, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/:id/sucursal', 
authenticate,
checkRole('administrador'),
cambiarSucursal
);

export default router;