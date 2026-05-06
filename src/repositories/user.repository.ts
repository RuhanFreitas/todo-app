import pool from '../database/index.ts'
import { RegisterUser } from '../schemas/auth/register-user.schema.ts'
import { IdUser } from '../schemas/user/id-user.schema.ts'
import { UpdateUser } from '../schemas/user/update-user.schema.ts'

class UserRepository {
    constructor(private readonly db = pool) {}

    async create(registerUser: RegisterUser) {
        const query =
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
        const clauses = [
            registerUser.name,
            registerUser.email,
            registerUser.password,
        ]

        const response = await this.db.query(query, clauses)

        return response.rows[0]
    }

    async findById(id: IdUser) {
        const query = 'SELECT * FROM users WHERE id = $1'
        const clause = [id]

        const response = await this.db.query(query, clause)

        if (response.rows[0] == null) {
            return 'User not found'
        }

        return response.rows[0]
    }

    async findByEmail(email: string) {
        const query = 'SELECT * FROM users WHERE email = $1'
        const clause = [email]

        const response = await this.db.query(query, clause)

        return response.rows[0]
    }

    async updateById(updateUser: UpdateUser) {
        const query = `
            UPDATE users SET
                name = COALESCE($1, name),
                email = COALESCE($2, email),
                password = COLAESCE($2, password) 
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `

        const clauses = [
            updateUser.name,
            updateUser.email,
            updateUser.password,
            updateUser.id,
        ]

        const response = await this.db.query(query, clauses)

        return response.rows[0]
    }

    async delete(id: IdUser) {
        const query = 'DELETE FROM users WHERE id = $1'
        const clause = [id]

        const response = await this.db.query(query, clause)

        return response
    }
}

export const userRepository = new UserRepository()
