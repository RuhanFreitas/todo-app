import { NextFunction, Request, Response } from 'express'
import { jwtService } from '../utils/jwt.ts'
import { AppError } from '../errors/AppError.ts'

export const authorizationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { token } = req.signedCookies

    const decoded = jwtService.verify(token)

    if (!decoded) {
        throw new AppError(
            'Oops... Seems like you can not access this service',
            401,
        )
    }

    next()
}
