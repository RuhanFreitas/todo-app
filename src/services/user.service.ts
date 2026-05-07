import { AppError } from '../errors/AppError.ts'
import { userRepository } from '../repositories/user.repository.ts'
import { IdUser } from '../schemas/user/id-user.schema.ts'
import { UpdateUser } from '../schemas/user/update-user.schema.ts'

export class UserService {
    constructor(private readonly repository = userRepository) {}

    async findById(id: IdUser) {
        const response = await this.repository.findById(id)

        if (!response) {
            throw new AppError('User not found', 404)
        }

        return response
    }

    async updateById(updateUser: UpdateUser) {
        const response = await this.repository.updateById(updateUser)

        if (!response) {
            throw new AppError('User not found', 404)
        }

        return response
    }

    async delete(id: IdUser) {
        const response = await this.repository.delete(id)

        if (!response) {
            throw new AppError('User not found', 404)
        }

        return response
    }
}

export const userService = new UserService()
