import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { AppError } from '../errors/AppError.ts'

class JwtService {
    private readonly SECRET: string | any

    constructor() {
        this.SECRET = process.env.SECRET

        if (!this.SECRET) {
            throw new AppError(
                'Some important key is missing from the production environment...',
                500,
            )
        }
    }

    sign(payload: any) {
        return jwt.sign({ data: payload }, this.SECRET, { expiresIn: '2h' })
    }

    verify(token: string) {
        return jwt.verify(token, this.SECRET)
    }
}

export const jwtService = new JwtService()
