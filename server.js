import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Servidor corriendo en puerto ${PORT}`);
});
