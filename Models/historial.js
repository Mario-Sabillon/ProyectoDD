import { supabase } from '../BD/db.js';
import { registrarBitacora } from '../Utils/logger.js';

export const registrarCambio = async (historialData, userId) => {
  const { data, error } = await supabase
    .from('historial_sucursales')
    .insert([{
      ...historialData,
      fecha_asignacion: new Date().toISOString()
    }])
    .select();

  if (error) throw error;

  await registrarBitacora(
    userId,
    'HISTORIAL_CAMBIO',
    'historial_sucursales',
    data[0].id,
    historialData
  );

  return data[0];
};

export const getHistorialPorEmpleado = async (empleadoId) => {
  const { data, error } = await supabase
    .from('historial_sucursales')
    .select('*, sucursales(*)')
    .eq('empleado_id', empleadoId)
    .order('fecha_asignacion', { ascending: false });

  if (error) throw error;
  return data;
};