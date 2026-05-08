import { Router } from 'express'
import { userController } from '../controllers/user.controller.ts'
import { validate } from '../middlewares/validate.middleware.ts'
import { UpdateUserSchema } from '../schemas/user/update-user.schema.ts'
import { IdUserSchema } from '../schemas/user/id-user.schema.ts'
import { authorizationMiddleware } from '../middlewares/authorization.middleware.ts'

const userRouter = Router()

// Find user by id
userRouter.get('/', authorizationMiddleware, validate(IdUserSchema), (req, res) => userController.findById(req, res))

// Update user by id
userRouter.patch('/', authorizationMiddleware, validate(UpdateUserSchema), (req, res) => userController.updateById(req, res))

// Delete user by id
userRouter.delete('/', authorizationMiddleware, validate(IdUserSchema), (req, res) => userController.delete(req, res))

export default userRouter
