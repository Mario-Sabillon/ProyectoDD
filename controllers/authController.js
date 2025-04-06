import {dbConnection} from '../BD/db.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//import path from 'path';

//console.log('Directorio actual:', __dirname);  // Esto te ayudará a verificar si la ruta es correcta

//import client from '../BD/db.js';  // La importación que estás usando

export const register = async (req, res) => {
const { email, password, role } = req.body;

try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *';
    const values = [email, hashedPassword, role];

    const result = await dbConnection.query(query, values);

    const token = jwt.sign({ id: result.rows[0].id, role: result.rows[0].role }, process.env.JWT_SECRET, {
expiresIn: '1h',
    });

    res.status(201).json({ token });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar usuario' });
}
};

export const login = async (req, res) => {
const { email, password } = req.body;

try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await dbConnection.query(query, [email]);

    if (result.rows.length === 0) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isValidPassword = await bcrypt.compare(password, result.rows[0].password);

    if (!isValidPassword) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: result.rows[0].id, role: result.rows[0].role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    });

    res.json({ token });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
}
};