import pg from 'pg';
import dotenv from 'dotenv';


const { Client } = pg;

dotenv.config();

const dbConnection = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

dbConnection.connect()
  .then(() => console.log('Conectado a la base de datos PostgreSQL'))
  .catch(err => console.error('Error de conexión a la base de datos:', err.stack));

export default dbConnection;  