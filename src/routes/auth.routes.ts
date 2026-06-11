import { Router } from "express";
import { authController } from "../controllers/auth.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { RegisterUserSchema } from "../schemas/auth/register-user.schema.ts";
import { LoginUserSchema } from "../schemas/auth/login-user.schema.ts";

export const authRouter = Router()

// Register user
authRouter.post('/register', validate(RegisterUserSchema), (req, res) => authController.register(req, res))

// Login user
authRouter.post('/login', validate(LoginUserSchema), (req, res) => authController.login(req, res))

