import { supabase } from '../BD/db.js';
import { registrarBitacora } from '../Utils/logger.js';

export const registrarAsistencia = async (asistenciaData, userId) => {
  const { data, error } = await supabase
    .from('asistencias')
    .insert([{
      ...asistenciaData,
      fecha: new Date().toISOString()
    }])
    .select();

  if (error) throw error;

  await registrarBitacora(
    userId,
    'REGISTRO_ASISTENCIA',
    'asistencias',
    data[0].id,
    asistenciaData
  );

  return data[0];
};

export const getAsistenciasPorFecha = async (fecha) => {
  const startDate = new Date(fecha);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(fecha);
  endDate.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('asistencias')
    .select('*, empleados(*), usuarios(*)')
    .gte('fecha', startDate.toISOString())
    .lte('fecha', endDate.toISOString());

  if (error) throw error;
  return data;
};

export const getAsistenciasPorEmpleado = async (empleadoId) => {
  const { data, error } = await supabase
    .from('asistencias')
    .select('*')
    .eq('empleado_id', empleadoId)
    .order('fecha', { ascending: false });

  if (error) throw error;
  return data;
};