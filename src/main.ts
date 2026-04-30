import 'dotenv/config'
import './database/index.ts'
import express from 'express'
import userRouter from './routes/user.routes.ts'
import taskRouter from './routes/task.routes.ts'

const app = express()

app.use('/user', userRouter)
app.use('/task', taskRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
