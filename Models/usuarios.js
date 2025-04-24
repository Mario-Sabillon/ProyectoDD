import { supabase } from '../BD/db.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { registrarBitacora } from '../Utils/logger.js';
import bcrypt from 'bcrypt';


export const createUser = async (userData) => {
  try {
    const result = await supabase.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [userData.nombre, userData.correo, await bcrypt.hash(userData.contrasena.toString(), 10), userData.rol]
    )
    // console.log('Insertado:', result.rows[0])
    return result.rows[0];
  } catch (error) {
    console.error('Error en INSERT:', error.message);
    throw error;
  }
};




export const getUserByEmail = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;


    // comparamos el correo
    const result = await supabase.query('SELECT * FROM usuarios where correo = $1', [correo]);
    if (result.rows.length === 0) {
      console.log('No se encontró el usuario con ese correo electrónico.');
      return null;
    }

    // Compraramos la contraseña
    try {
      const isMatch = await bcrypt.compare(contrasena.toString(), result.rows[0].contrasena);
      if (isMatch) {
        const token = await generateToken(result.rows[0]);
        return { Token: token };
      }
      else {
        console.error('Credenciales invalidas.');
        return { Error: "Credenciales invalidas." };
      }
    } catch (error) {
    console.error('Error en SELECT:', error.message)
    }
  } catch (error) {
  console.error('Error en SELECT:', error.message)
  }
};






export const updateUser = async (id, updates, userId) => {
  const { data, error } = await supabase
    .from('usuarios')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  
  await registrarBitacora(
    userId,
    'UPDATE',
    'usuarios',
    id,
    updates
  );
  
  return data[0];
};