import { Router } from 'express'
import { userController } from '../controllers/user.controller.ts'
import { validate } from '../middlewares/validate.middleware.ts'
import { CreateUserSchema } from '../schemas/create-user.schema.ts'
import { UpdateUserSchema } from '../schemas/update-user.schema.ts'
import { IdUserSchema } from '../schemas/id-user.schema.ts'

const userRouter = Router()

userRouter.post('/', validate(CreateUserSchema), (req, res) => userController.create(req, res))

userRouter.get('/', validate(IdUserSchema), (req, res) => userController.findById(req, res))

userRouter.patch('/', validate(UpdateUserSchema), (req, res) => userController.updateById(req, res))

userRouter.delete('/', validate(IdUserSchema), (req, res) => userController.delete(req, res))

export default userRouter
