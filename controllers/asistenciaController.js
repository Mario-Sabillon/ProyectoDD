import { registrarAsistencia, getAsistenciasPorFecha, getAsistenciasPorEmpleado } from '../Models/asistencias.js';
import { logger } from '../Utils/logger.js';

export const registrarAsistenciaHandler = async (req, res) => {
  try {
    const asistencia = await registrarAsistencia(req.body, req.user.id);
    res.status(201).json(asistencia);
  } catch (error) {
    logger.error('Error al registrar asistencia', { error: error.message });
    res.status(500).json({ error: 'Error al registrar asistencia' });
  }
};

export const getAsistenciasPorFechaHandler = async (req, res) => {
  try {
    const asistencias = await getAsistenciasPorFecha(req.params.fecha);
    res.json(asistencias);
  } catch (error) {
    logger.error('Error al obtener asistencias', { error: error.message });
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
};

export const getAsistenciasPorEmpleadoHandler = async (req, res) => {
  try {
    const asistencias = await getAsistenciasPorEmpleado(req.params.empleadoId);
    res.json(asistencias);
  } catch (error) {
    logger.error('Error al obtener asistencias', { error: error.message });
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
};