import { pool } from '../BD/db.js'; // Asegúrate de que el cliente de la base de datos está exportado correctamente

// Registrar asistencia
export const registrarAsistencia = async (req, res) => {
  const { empleado_id, estado } = req.body; // Obtén los datos de la solicitud

try {
    const result = await pool.query(
      'INSERT INTO Asistencias (empleado_id, fecha, estado, registrado_por) VALUES ($1, NOW(), $2, $3) RETURNING *',
      [empleado_id, estado, req.user.id] // Suponiendo que req.user.id es el ID del usuario que registra la asistencia
    );
    res.status(201).json(result.rows[0]);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la asistencia' });
}
};

// Obtener asistencia de un empleado
export const obtenerAsistencias = async (req, res) => {
const { empleado_id } = req.params;

try {
    const result = await pool.query(
      'SELECT * FROM Asistencias WHERE empleado_id = $1 ORDER BY fecha DESC',
    [empleado_id]
    );
    res.status(200).json(result.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las asistencias' });
}
};

// Actualizar asistencia
export const actualizarAsistencia = async (req, res) => {
const { id } = req.params;
const { estado } = req.body;

try {
    const result = await pool.query(
      'UPDATE Asistencias SET estado = $1 WHERE id = $2 RETURNING *',
    [estado, id]
    );
    if (result.rowCount > 0) {
    res.status(200).json(result.rows[0]);
    } else {
    res.status(404).json({ message: 'Asistencia no encontrada' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la asistencia' });
}
};

// Eliminar asistencia
export const eliminarAsistencia = async (req, res) => {
const { id } = req.params;

try {
    const result = await pool.query('DELETE FROM Asistencias WHERE id = $1', [id]);
    if (result.rowCount > 0) {
    res.status(200).json({ message: 'Asistencia eliminada' });
    } else {
    res.status(404).json({ message: 'Asistencia no encontrada' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la asistencia' });
}
};
