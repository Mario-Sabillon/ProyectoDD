import { 
    createSucursal, 
    getSucursalById, 
    getSucursalConEmpleados, 
    updateSucursal, 
    deleteSucursal 
} from '../Models/sucursales.js';
import { logger } from '../Utils/logger.js';

export const createSucursalHandler = async (req, res) => {
    try {
    const sucursal = await createSucursal(req.body, req.user.id);
    res.status(201).json(sucursal);
    } catch (error) {
    logger.error('Error al crear sucursal', { error: error.message });
    res.status(500).json({ error: 'Error al crear sucursal' });
    }
};
export const getSucursalHandler = async (req, res) => {
    try {
    const sucursal = await getSucursalById(req.params.id);
    res.json(sucursal);
    } catch (error) {
    logger.error('Error al obtener sucursal', { error: error.message });
    res.status(500).json({ error: 'Error al obtener sucursal' });
    }
};
export const getSucursalEmpleadosHandler = async (req, res) => {
    try {
    const sucursal = await getSucursalConEmpleados(req.params.id);
    res.json(sucursal);
    } catch (error) {
    logger.error('Error al obtener sucursal con empleados', { error: error.message });
    res.status(500).json({ error: 'Error al obtener sucursal con empleados' });
    }
};

export const updateSucursalHandler = async (req, res) => {
    try {
    const sucursal = await updateSucursal(req.params.id, req.body, req.user.id);
    res.json(sucursal);
    } catch (error) {
    logger.error('Error al actualizar sucursal', { error: error.message });
    res.status(500).json({ error: 'Error al actualizar sucursal' });
    }
};

export const deleteSucursalHandler = async (req, res) => {
    try {
    await deleteSucursal(req.params.id, req.user.id);
    res.status(204).send();
    } catch (error) {
    logger.error('Error al eliminar sucursal', { error: error.message });
    res.status(500).json({ error: 'Error al eliminar sucursal' });
    }
};