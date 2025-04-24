import { supabase } from '../BD/db.js';

export const registrarAccion = async (bitacoraData) => {
  const { data, error } = await supabase
    .from('bitacora')
    .insert([bitacoraData])
    .select();

  if (error) throw error;
  return data[0];
};

export const getRegistrosBitacora = async ({ limit = 100, offset = 0 } = {}) => {
  const { data, error } = await supabase
    .from('bitacora')
    .select('*, usuarios(nombre)')
    .order('fecha_hora', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
};

export const getRegistrosPorUsuario = async (usuarioId) => {
  const { data, error } = await supabase
    .from('bitacora')
    .select('*')
    .eq('usuario_id', usuarioId)
    .order('fecha_hora', { ascending: false });

  if (error) throw error;
  return data;
};