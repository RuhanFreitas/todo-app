import { Request, Response } from 'express'
import { authService } from '../services/auth.service.ts'

class AuthController {
    constructor(private readonly service = authService) {}

    async register(req: Request, res: Response) {
        const [user, token] = await this.service.register(req.body)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7200000,
        })

        res.status(200).json({ user, token })
    }

    async login(req: Request, res: Response) {
        const response = await this.service.login(req.body)

        if (!response.token) {
            res.status(401).json({ message: 'Oops... something went wrong' })
        }

        const { token, user } = response

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7200000,
        })

        res.status(200).json(user)
    }
}

export const authController = new AuthController()
