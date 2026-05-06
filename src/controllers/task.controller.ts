import { Request, Response } from 'express'
import { taskService } from '../services/task.service.ts'
import { UpdateTaskStatus } from '../schemas/task/update-task-status.schema.ts'
import { UpdateTask } from '../schemas/task/update-task.schema.ts'
import { IdTask } from '../schemas/task/id-task.schema.ts'
import { DeleteTask } from '../schemas/task/delete-task.schema.ts'

class TaskController {
    constructor(private readonly service = taskService) {}

    async create(req: Request, res: Response) {
        const response = await this.service.create(req.body)

        res.status(201).json(response)
    }

    async findById(req: Request, res: Response) {
        const response = await this.service.findById(req.body)

        res.status(200).json(response)
    }

    async findAll(req: Request, res: Response) {
        const response = await this.service.findAll(req.body.user_id)

        res.status(200).json(response)
    }

    async updateStatus(req: Request, res: Response) {
        const response = await this.service.updateStatus(req.body)

        res.status(200).json(response)
    }

    async updateById(req: Request, res: Response) {
        const response = await this.service.updateById(req.body)

        res.status(200).json(response)
    }

    async delete(req: Request, res: Response) {
        await this.service.delete(req.body)

        res.status(200).json({ message: 'Task deleted successfully!' })
    }
}

export const taskController = new TaskController()
