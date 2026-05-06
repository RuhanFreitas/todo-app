import { Router } from 'express'
import { userController } from '../controllers/user.controller.ts'
import { validate } from '../middlewares/validate.middleware.ts'
import { CreateUserSchema } from '../schemas/auth/register-user.schema.ts'
import { UpdateUserSchema } from '../schemas/user/update-user.schema.ts'
import { IdUserSchema } from '../schemas/user/id-user.schema.ts'

const userRouter = Router()

// Find user by id
userRouter.get('/', validate(IdUserSchema), (req, res) => userController.findById(req, res))

// Update user by id
userRouter.patch('/', validate(UpdateUserSchema), (req, res) => userController.updateById(req, res))

// Delete user by id
userRouter.delete('/', validate(IdUserSchema), (req, res) => userController.delete(req, res))

export default userRouter
