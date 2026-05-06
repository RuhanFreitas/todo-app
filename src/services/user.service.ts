import { userRepository } from '../repositories/user.repository.ts'
import { IdUser } from '../schemas/user/id-user.schema.ts'
import { UpdateUser } from '../schemas/user/update-user.schema.ts'

export class UserService {
    constructor(private readonly repository = userRepository) {}

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
