import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    maxLifetimeSeconds: 60,
})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function initializeDatabase() {
    let connected = false

    console.log('Trying to connect to the database...')

    while (!connected) {
        try {
            const client = await pool.connect()
            console.log('Connection established successfully')

            await client.query(`
                DO $$ 
                BEGIN
                  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
                    CREATE TYPE task_status AS ENUM ('PENDING', 'COMPLETED', 'ONGOING');
                  END IF;
                END $$;
            `)

            await client.query(`
                CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(80) NOT NULL,
                    email VARCHAR(80) NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    created_at TIMESTAMPTZ default CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ default CURRENT_TIMESTAMP
                )  
            `)

            await client.query(`
                CREATE TABLE IF NOT EXISTS tasks(
                    id SERIAL PRIMARY KEY,
                    user_id INT REFERENCES users(id) ON DELETE CASCADE,
                    title VARCHAR(80) NOT NULL,
                    description TEXT NOT NULL,
                    status task_status DEFAULT 'PENDING',
                    created_at TIMESTAMPTZ default CURRENT_TIMESTAMP,
                    updated_at TIMESTAMPTZ default CURRENT_TIMESTAMP
                )
            `)

            client.release()
            console.log('Tables created successfully')
            connected = true
        } catch (error) {
            console.error(
                "Couldn't connect to the database, trying again in 5 seconds...",
            )
            await sleep(5000)
        }
    }
}

initializeDatabase()

pool.on('error', (e) => {
    console.error('Erro inesperado no pool de conexões:', e)
})

export default pool


