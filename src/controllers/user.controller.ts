import { Request, Response } from 'express'
import { userRepository } from '../repositories/user.repository.ts'

class UserController {
    constructor(private readonly repository = userRepository) {}

    async create(req: Request, res: Response) {
        const response = await this.repository.create(req.body)

        res.status(201).json(response)
    }

    async findById(req: Request, res: Response) {
        const response = await this.repository.findById(req.body.id)

        res.status(200).json(response)
    }

    async updateById(req: Request, res: Response) {
        const response = await this.repository.updateById(req.body)

        res.status(200).json(response)
    }

    async delete(req: Request, res: Response) {
        await this.repository.delete(req.body.id)

        res.status(200).json('User deleted successfully')
    }
}

export const userController = new UserController()
