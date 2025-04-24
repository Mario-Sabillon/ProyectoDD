import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../Models/usuarios.js';
import { logger } from '../Utils/logger.js';

export const login = async (req, res) => {
try {
    // console.log(req);
    const { correo, contrasena } = req.body;
    
    const user = await getUserByEmail(req, res).then((result) => {
        console.log('result', result);  
        const token = result.Token;
        logger.info('Inicio de sesión exitoso', { user: correo });
        //res.json({ token }); // muestra el token en la respuesta
        res.status(200).json("Inicio de sesión exitoso");
    })

} catch (error) {
    logger.error('Error en login', { error: error.message });
    res.status(500).json({ error: 'Error en autenticación' });
}
};

export const register = async (req, res) => {
try {
    const user = await createUser(req.body);
    
    const token = jwt.sign(
    { id: user.id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
    );

    logger.info('Usuario registrado', { userId: user.id });
    res.status(201).json({ token });
} catch (error) {
    logger.error('Error en registro', { error: error.message });
    res.status(500).json({ error: 'Error al registrar usuario' });
}
};