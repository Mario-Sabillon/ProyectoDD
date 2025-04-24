import { getHistorialPorEmpleado } from '../Models/historial.js';
import { logger } from '../Utils/logger.js';

export const getHistorialEmpleado = async (req, res) => {
try {
    const historial = await getHistorialPorEmpleado(req.params.empleadoId);
    res.json(historial);
} catch (error) {
    logger.error('Error al obtener historial', { 
    error: error.message,
    empleadoId: req.params.empleadoId 
    });
    res.status(500).json({ error: 'Error al obtener historial' });
}
};