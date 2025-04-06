import { pool } from '../BD/db.js';

// Crear sucursal
export const crearSucursal = async (req, res) => {
const { nombre, ubicacion, descripcion } = req.body;

try {
    const result = await pool.query(
      'INSERT INTO Sucursales (nombre, ubicacion, descripcion) VALUES ($1, $2, $3) RETURNING *',
    [nombre, ubicacion, descripcion]
    );
    res.status(201).json(result.rows[0]);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la sucursal' });
}
};

// Obtener todas las sucursales
export const obtenerSucursales = async (req, res) => {
try {
    const result = await pool.query('SELECT * FROM Sucursales ORDER BY fecha_creacion DESC');
    res.status(200).json(result.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las sucursales' });
}
};

// Actualizar sucursal
export const actualizarSucursal = async (req, res) => {
const { id } = req.params;
const { nombre, ubicacion, descripcion } = req.body;

try {
    const result = await pool.query(
      'UPDATE Sucursales SET nombre = $1, ubicacion = $2, descripcion = $3 WHERE id = $4 RETURNING *',
    [nombre, ubicacion, descripcion, id]
    );
    if (result.rowCount > 0) {
    res.status(200).json(result.rows[0]);
    } else {
    res.status(404).json({ message: 'Sucursal no encontrada' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la sucursal' });
}
};

// Eliminar sucursal
export const eliminarSucursal = async (req, res) => {
const { id } = req.params;

try {
    const result = await pool.query('DELETE FROM Sucursales WHERE id = $1', [id]);
    if (result.rowCount > 0) {
    res.status(200).json({ message: 'Sucursal eliminada' });
    } else {
    res.status(404).json({ message: 'Sucursal no encontrada' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la sucursal' });
}
};