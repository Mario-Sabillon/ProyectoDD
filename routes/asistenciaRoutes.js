import express from 'express';
import { registrarAsistencia, obtenerAsistencias, actualizarAsistencia, eliminarAsistencia } from '../controllers/asistenciaController.js';

const router = express.Router();

router.post('/', registrarAsistencia);
router.get('/:empleado_id', obtenerAsistencias);
router.put('/:id', actualizarAsistencia);
router.delete('/:id', eliminarAsistencia);

export default router;
