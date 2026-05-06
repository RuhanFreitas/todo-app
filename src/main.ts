import './database/index.ts'
import 'dotenv/config'
import 'reflect-metadata'

import express from 'express'
import userRouter from './routes/user.routes.ts'
import taskRouter from './routes/task.routes.ts'

import { connectDB } from './database/index.ts'

await connectDB()

const app = express()

app.use(express.json())

app.use('/user', userRouter)
app.use('/task', taskRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
