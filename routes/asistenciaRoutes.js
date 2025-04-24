
import express from 'express';
import { 
registrarAsistenciaHandler, 
getAsistenciasPorFechaHandler,
getAsistenciasPorEmpleadoHandler 
} from '../controllers/asistenciaController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, registrarAsistenciaHandler);
router.get('/fecha/:fecha', authenticate, getAsistenciasPorFechaHandler);
router.get('/empleado/:empleadoId', authenticate, getAsistenciasPorEmpleadoHandler);

export default router;