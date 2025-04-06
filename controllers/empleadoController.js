import {dbConnection} from '../BD/db.js'; 

export const createEmpleado = async (req, res) => {
const { nombre, correo, sucursal_id } = req.body;

try {
    const query = 'INSERT INTO empleados (nombre, correo, sucursal_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, correo, sucursal_id];

    const result = await dbConnection.query(query, values);

    res.status(201).json({ message: 'Empleado creado exitosamente', data: result.rows[0] });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear empleado' });
}
};

export const getEmpleados = async (req, res) => {
try {
    const result = await dbConnection.query('SELECT * FROM empleados');
    res.status(200).json(result.rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener empleados' });
}
};