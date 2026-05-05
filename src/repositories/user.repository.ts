import pool from '../database/index.ts'
import { CreateUser } from '../schemas/create-user.schema.ts'
import { IdUser } from '../schemas/id-user.schema.ts'
import { UpdateUser } from '../schemas/update-user.schema.ts'

class UserRepository {
    constructor(private readonly db = pool) {}

    async create(createUser: CreateUser) {
        const response = await this.db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [createUser.name, createUser.email, createUser.password],
        )

        return response.rows[0]
    }

    async findById(id: IdUser) {
        const response = await this.db.query(
            'SELECT * FROM users WHERE id = $1',
            [id],
        )

        if (response.rows[0] == null) {
            return 'User not found'
        }

        return response.rows[0]
    }

    async updateById(updateUser: UpdateUser) {
        const { id, ...fields } = updateUser

        const keys = Object.keys(fields)
        if (keys.length === 0) return

        const setClause = keys
            .map((key, index) => `"${key}" = $${index + 1}`)
            .join(', ')

        const values = Object.values(fields)

        values.push(id)

        const idPosition = values.length

        const query = `
                UPDATE users 
                SET ${setClause} 
                WHERE id = $${idPosition}
                RETURNING *;
            `

        const response = await this.db.query(query, values)

        if (response.rows[0] == null) {
            return 'You can not update an unexisting user'
        }

        return response.rows[0]
    }

    async delete(id: IdUser) {
        const response = await this.db.query(
            'DELETE FROM users WHERE id = $1',
            [id],
        )

        return response
    }
}

export const userRepository = new UserRepository()
