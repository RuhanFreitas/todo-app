import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60,
})

try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ default CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ default CURRENT_TIMESTAMP
    )  
`)

    await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        title VARCHAR(80) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMPTZ default CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ default CURRENT_TIMESTAMP
    )
`)
    console.log('Tables create successfully')
} catch (error) {
    console.error(error)
}

pool.on('error', (e) => {
    console.error('Ops... Something is wrong ', e)
})

export default pool
