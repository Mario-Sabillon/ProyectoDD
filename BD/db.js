import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const supabase = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

supabase.connect()
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error.message)
  })

export const query = (text, params) => supabase.query(text, params)
export { supabase }
