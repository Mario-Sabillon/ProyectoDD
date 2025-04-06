import { pool } from '../BD/db.js';

// Generar reporte de asistencias por fecha
export const generarReporteAsistencias = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query; // Parámetros de fecha para el reporte

try {
    const result = await pool.query(
      'SELECT * FROM Asistencias WHERE fecha BETWEEN $1 AND $2 ORDER BY fecha',
    [fecha_inicio, fecha_fin]
    );
    res.status(200).json(result.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el reporte de asistencias' });
}
};

// Generar reporte de empleados por sucursal
export const generarReporteEmpleadosSucursal = async (req, res) => {
const { sucursal_id } = req.params;

try {
    const result = await pool.query(
      'SELECT * FROM Empleados WHERE sucursal_id = $1',
    [sucursal_id]
    );
    res.status(200).json(result.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el reporte de empleados' });
}
};