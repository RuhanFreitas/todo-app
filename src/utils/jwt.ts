import 'dotenv/config'
import jwt from 'jsonwebtoken'

class JwtService {
    private readonly SECRET: string | any = process.env.SECRET

    constructor() {}

    sign(payload: any) {
        return jwt.sign({ data: payload }, this.SECRET, { expiresIn: '2h' })
    }

    verify(token: string) {
        return jwt.verify(token, this.SECRET)
    }
}

export const jwtService = new JwtService()

