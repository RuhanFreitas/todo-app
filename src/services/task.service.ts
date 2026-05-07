import { AppError } from '../errors/AppError.ts'
import { taskRepository } from '../repositories/task.repository.ts'
import { CreateTask } from '../schemas/task/create-task.schema.ts'
import { DeleteTask } from '../schemas/task/delete-task.schema.ts'
import { IdTask } from '../schemas/task/id-task.schema.ts'
import { UpdateTaskStatus } from '../schemas/task/update-task-status.schema.ts'
import { UpdateTask } from '../schemas/task/update-task.schema.ts'
import { UserId } from '../schemas/task/user-id.schema.ts'

class TaskService {
    constructor(private readonly repository = taskRepository) {}

    async create(createTask: CreateTask) {
        const response = await this.repository.create(createTask)

        return response
    }

    async findById(idTask: IdTask) {
        const response = await this.repository.findById(idTask)

        if (!response) {
            throw new AppError('Task not found', 404)
        }

        return response
    }

    async findAll(user_id: UserId) {
        const response = await this.repository.findAll(user_id)

        return response
    }

    async updateStatus(updateTaskStatus: UpdateTaskStatus) {
        const response = await this.repository.updateStatus(updateTaskStatus)

        if (!response) {
            throw new AppError('Task not found', 404)
        }

        return response
    }

    async updateById(updateTask: UpdateTask) {
        const response = await this.repository.updateById(updateTask)

        if (!response) {
            throw new AppError('Task not found', 404)
        }

        return response
    }

    async delete(deleteTask: DeleteTask) {
        const response = await this.repository.delete(deleteTask)

        if (!response) {
            throw new AppError('Task not found', 404)
        }

        return response
    }
}

export const taskService = new TaskService()
