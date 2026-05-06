import 'dotenv/config'
import jwt from 'jsonwebtoken'

class JwtService {
    private readonly SECRET: string | any

    constructor() {
        this.SECRET = process.env.SECRET

        if (!this.SECRET) {
            throw new Error(
                'Oops... Important values are missing from the secret keys...',
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
