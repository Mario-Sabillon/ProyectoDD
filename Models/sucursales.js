import { supabase } from '../BD/db.js';
import { registrarBitacora } from '../Utils/logger.js';

export const createSucursal = async (sucursalData, userId) => {
  const { data, error } = await supabase
    .from('sucursales')
    .insert([sucursalData])
    .select();

  if (error) throw error;

  await registrarBitacora(
    userId,
    'CREATE',
    'sucursales',
    data[0].id,
    sucursalData
  );

  return data[0];
};

export const getSucursalById = async (id) => {
  const { data, error } = await supabase
    .from('sucursales')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getSucursalConEmpleados = async (id) => {
  const { data, error } = await supabase
    .from('sucursales')
    .select('*, empleados(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const updateSucursal = async (id, updates, userId) => {
  const { data, error } = await supabase
    .from('sucursales')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw error;

  await registrarBitacora(
    userId,
    'UPDATE',
    'sucursales',
    id,
    updates
  );

  return data[0];
};

export const deleteSucursal = async (id, userId) => {
  const { error } = await supabase
    .from('sucursales')
    .delete()
    .eq('id', id);

  if (error) throw error;

  await registrarBitacora(
    userId,
    'DELETE',
    'sucursales',
    id,
    { sucursal_id: id }
  );

  return true;
};