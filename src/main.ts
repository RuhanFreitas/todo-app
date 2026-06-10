import './db/index.ts'
import 'dotenv/config'
import 'reflect-metadata'

import express, { Request, Response } from 'express'
import userRouter from './routes/user.routes.ts'
import taskRouter from './routes/task.routes.ts'
import cookieParser from 'cookie-parser'

import { authRouter } from './routes/auth.routes.ts'
import { errorMiddleware } from './middlewares/error.middleware.ts'

const app = express()

app.use(cookieParser(process.env.SECRET))
app.use(express.json())

app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/auth', authRouter)

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})


