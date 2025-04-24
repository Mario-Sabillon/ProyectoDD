import { updateSucursal } from '../Models/empleados.js';
import { logger } from '../Utils/logger.js';

export const cambiarSucursal = async (req, res) => {
try {
    const empleado = await updateSucursal(
    req.params.id,
    req.body.sucursal_id,
    req.user.id
    );
    
    res.json(empleado);
} catch (error) {
    logger.error('Error al cambiar sucursal', {
    error: error.message,
    empleadoId: req.params.id,
    userId: req.user.id
    });
    res.status(500).json({ error: 'Error al cambiar sucursal' });
}
};