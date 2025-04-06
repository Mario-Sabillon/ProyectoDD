// BD/db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const dbConnection = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // IMPORTANTE para conexiones seguras a Supabase
  },
});

dbConnection.connect()
  .then(() => console.log('✅ Conectado a la base de datos PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión a la base de datos:', err.stack));

// Solo necesitas exportar esto
export { dbConnection };
