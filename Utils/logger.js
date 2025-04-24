import { createLogger, format, transports } from 'winston';
import * as bitacoraModel from '../models/bitacora.js';


const logger = createLogger({
level: 'info',
format: format.combine(
    format.timestamp(),
    format.json()
),
transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/application.log' })
]
});

export const registrarBitacora = async (usuarioId, accion, tabla, registroId, detalles) => {
try {
    await bitacoraModel.registrarAccion({
    usuario_id: usuarioId,
    accion,
    tabla,
    registro_id: registroId,
    detalles: typeof detalles === 'object' ? JSON.stringify(detalles) : detalles
    });
    logger.info(`Bitácora: ${accion} en ${tabla}`, { usuarioId, registroId });
} catch (error) {
    logger.error('Error al registrar en bitácora', { error: error.message });
}
};

logger.middleware = (req, res, next) => {
const start = Date.now();

res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http(`${req.method} ${req.url}`, {
    status: res.statusCode,
    duration,
    user: req.user?.id
    });
});

next();
};

export { logger };