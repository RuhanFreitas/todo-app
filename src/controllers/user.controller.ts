import { Request, Response } from 'express'
import { userService } from '../services/user.service.ts'

class UserController {
    constructor(private readonly service = userService) {}

    async findById(req: Request, res: Response) {
        const response = await this.service.findById(req.body.id)

        res.status(200).json(response)
    }

    async updateById(req: Request, res: Response) {
        const response = await this.service.updateById(req.body)

        res.status(200).json(response)
    }

    async delete(req: Request, res: Response) {
        await this.service.delete(req.body.id)

        res.status(200).json('User deleted successfully')
    }
}

export const userController = new UserController()
