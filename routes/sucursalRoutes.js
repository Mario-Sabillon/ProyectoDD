import express from 'express';
import { crearSucursal, obtenerSucursales, actualizarSucursal, eliminarSucursal } from '../controllers/sucursalController.js';

const router = express.Router();

router.post('/', crearSucursal);
router.get('/', obtenerSucursales);
router.put('/:id', actualizarSucursal);
router.delete('/:id', eliminarSucursal);

export default router;