import pool from '../database/index.ts'

export class UserRepository {
    constructor(private readonly db = pool) {}

    async create() {}

    async findById() {}

    async updateById() {}

    async delete() {}
}
