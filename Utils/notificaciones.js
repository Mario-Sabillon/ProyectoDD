//enviar correo electronico automatico cuando un administrador mueva a un empleado a otra sucursal.

import nodemailer from 'nodemailer';
import { logger } from '../Utils/logger.js';

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
}
});

export const enviarNotificacionCambioSucursal = async (email, sucursalAnterior, sucursalNueva) => {
try {
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Cambio de Sucursal Asignada',
    html: `<p>Se ha cambiado tu sucursal asignada de ${sucursalAnterior} a ${sucursalNueva}.</p>`
    };

    await transporter.sendMail(mailOptions);
    logger.info('Notificación enviada', { email, sucursalAnterior, sucursalNueva });
} catch (error) {
    logger.error('Error al enviar notificación', { error: error.message });
}
};