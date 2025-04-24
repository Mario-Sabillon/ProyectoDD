import jwt from 'jsonwebtoken';
import { logger } from '../Utils/logger.js';

// const secret = config.jwt.secret;
export const authenticate = (req, res, next) => {
try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
} catch (error) {
    logger.error('Error en autenticación', { error: error.message });
    res.status(401).json({ error: 'Token inválido' });
}
};

export const checkRole = (role) => (req, res, next) => {
if (req.user.rol !== role) {
    logger.warn('Intento de acceso no autorizado', { user: req.user.id, ruta: req.path });
    return res.status(403).json({ error: 'Acceso prohibido' });
}
next();
};


export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'Token no Proporcionado' });
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'No se pudo autenticar el token' });
        req.userId = decoded.id;
        next();
    });
};

export const generateToken = (user) => {
    const token = jwt.sign({ Usuario: user},'I HAVE A VALUE',{ expiresIn: 86400 });
    return token;
}