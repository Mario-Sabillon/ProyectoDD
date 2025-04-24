import { supabase }from '../BD/db.js';
import { registrarBitacora } from '../Utils/logger.js';
import { enviarNotificacionCambioSucursal } from '../Utils/notificaciones.js';

export const createEmpleado = async (empleadoData, userId) => {
  const { data, error } = await supabase
    .from('empleados')
    .insert([empleadoData])
    .select();
  
  if (error) throw error;
  
  await registrarBitacora(
    userId,
    'CREATE',
    'empleados',
    data[0].id,
    empleadoData
  );
  
  return data[0];
};

export const updateSucursal = async (empleadoId, nuevaSucursalId, userId) => {
  // Obtener datos actuales
  const { data: empleado, error: fetchError } = await supabase
    .from('empleados')
    .select('*')
    .eq('id', empleadoId)
    .single();
  
  if (fetchError) throw fetchError;

  // Actualizar
  const { data, error } = await supabase
    .from('empleados')
    .update({ sucursal_id: nuevaSucursalId })
    .eq('id', empleadoId)
    .select();
  
  if (error) throw error;

  // Registrar en bitácora
  await registrarBitacora(
    userId,
    'UPDATE_SUCURSAL',
    'empleados',
    empleadoId,
    {
      anterior: empleado.sucursal_id,
      nuevo: nuevaSucursalId
    }
  );

  // Enviar notificación
  await enviarNotificacionCambioSucursal(
    empleado.correo_electronico,
    empleado.sucursal_id,
    nuevaSucursalId
  );

  return data[0];
};