import { userRepository } from '../repositories/user.repository.ts'
import { RegisterUser } from '../schemas/auth/register-user.schema.ts'
import { bcryptHash } from '../utils/bcrypt.ts'
import { jwtService } from '../utils/jwt.ts'
import { User } from '../types/user.type.ts'
import { LoginUser } from '../schemas/auth/login-user.schema.ts'

class AuthService {
    constructor(
        private readonly repository = userRepository,
        private readonly bcrypt = bcryptHash,
        private readonly jwt = jwtService,
    ) {}

    async register(registerUser: RegisterUser) {
        const hash = await this.bcrypt.hash(registerUser.password)

        registerUser = {
            ...registerUser,
            password: hash,
        }

        const user: User = await this.repository.create(registerUser)

        const payload = {
            sub: user.id,
        }

        const token = this.jwt.sign(payload)

        return [user, token]
    }

    async login(loginUser: LoginUser) {
        const user: User = await this.repository.findByEmail(loginUser.email)

        const isMatch = this.bcrypt.compare(
            loginUser.password,
            loginUser.password,
        )

        if (!isMatch) {
            return {
                token: null,
                user: null,
                message: 'Fail',
            }
        }

        const payload = {
            sub: user.id,
        }

        const token = this.jwt.sign(payload)

        const response = {
            token: token,
            user: user,
            message: 'Success',
        }

        return response
    }
}

export const authService = new AuthService()
