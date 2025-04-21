import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
const token = req.header('Authorization');

if (!token) return res.status(403).json({ message: 'Acceso denegado' });

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
} catch (err) {
    return res.status(401).json({ message: 'Error de Datos' });
}
};