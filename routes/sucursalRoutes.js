import express from 'express';
import { 
createSucursalHandler,
getSucursalHandler,
getSucursalEmpleadosHandler,
updateSucursalHandler,
deleteSucursalHandler
} from '../controllers/sucursalController.js';
import { authenticate, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, checkRole('administrador'), createSucursalHandler);
router.get('/:id', authenticate, getSucursalHandler);
router.get('/:id/empleados', authenticate, getSucursalEmpleadosHandler);
router.put('/:id', authenticate, checkRole('administrador'), updateSucursalHandler);
router.delete('/:id', authenticate, checkRole('administrador'), deleteSucursalHandler);

export default router;