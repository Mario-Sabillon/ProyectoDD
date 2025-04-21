import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const dbConnection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

dbConnection.connect()
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error.message)
  })

export const query = (text, params) => dbConnection.query(text, params)
export { dbConnection }
