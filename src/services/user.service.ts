import { userRepository } from '../repositories/user.repository.ts'
import { CreateUser } from '../schemas/user/create-user.schema.ts'
import { IdUser } from '../schemas/user/id-user.schema.ts'
import { UpdateUser } from '../schemas/user/update-user.schema.ts'

export class UserService {
    constructor(private readonly repository = userRepository) {}

    async create(createUser: CreateUser) {
        const response = await this.repository.create(createUser)

        return response
    }

    async findById(id: IdUser) {
        const response = await this.repository.findById(id)

        return response
    }

    async updateById(updateUser: UpdateUser) {
        const response = await this.repository.updateById(updateUser)

        return response
    }

    async delete(id: IdUser) {
        const response = await this.repository.delete(id)

        return response
    }
}

export const userService = new UserService()
