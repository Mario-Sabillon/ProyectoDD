import { supabase } from '../BD/db.js';
import { logger } from '../Utils/logger.js';

export const getReporteEmpleadosSucursal = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reporte_empleados_sucursal')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    logger.error('Error al generar reporte empleados por sucursal', { error: error.message });
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};

export const getReporteAsistencia = async (req, res) => {
  try {
    const { fecha } = req.query;
    let query = supabase
      .from('reporte_asistencia_empleados')
      .select('*');

    if (fecha) {
      const startDate = new Date(fecha);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(fecha);
      endDate.setHours(23, 59, 59, 999);

      query = query
        .gte('fecha_asistencia', startDate.toISOString())
        .lte('fecha_asistencia', endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    logger.error('Error al generar reporte de asistencias', { error: error.message });
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};

export const getReporteBitacora = async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const { data, error } = await supabase
      .from('reporte_bitacora')
      .select('*')
      .order('fecha_hora', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    logger.error('Error al generar reporte de bitácora', { error: error.message });
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};

export const getReporteHistorialSucursales = async (req, res) => {
  try {
    const { empleado_id } = req.query;
    let query = supabase
      .from('reporte_historial_sucursales')
      .select('*');

    if (empleado_id) {
      query = query.eq('empleado_id', empleado_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    logger.error('Error al generar reporte de historial', { error: error.message });
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};

export const getSucursalesConEmpleados = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('vista_sucursales_con_empleados')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    logger.error('Error al generar vista de sucursales con empleados', { error: error.message });
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};