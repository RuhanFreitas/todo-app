import pool from '../db/index.ts'
import { CreateTask } from '../schemas/task/create-task.schema.ts'
import { DeleteTask } from '../schemas/task/delete-task.schema.ts'
import { IdTask } from '../schemas/task/id-task.schema.ts'
import { UpdateTaskStatus } from '../schemas/task/update-task-status.schema.ts'
import { UpdateTask } from '../schemas/task/update-task.schema.ts'
import { UserId } from '../schemas/task/user-id.schema.ts'

export class TaskRepository {
    constructor(private readonly db = pool) {}

    async create(createTask: CreateTask) {
        const query =
            'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *'
        const clauses = [
            createTask.user_id,
            createTask.title,
            createTask.description,
        ]

        const response = await this.db.query(query, clauses)

        return response.rows[0]
    }

    async findById(idTask: IdTask) {
        const query = 'SELECT * FROM tasks WHERE id = $1 AND user_id = $2'
        const clauses = [idTask.id, idTask.user_id]

        const response = await this.db.query(query, clauses)

        return response.rows[0]
    }

    async findAll(user_id: UserId) {
        const query = 'SELECT * FROM tasks WHERE user_id = $1'
        const clause = [user_id.user_id]

        const response = await this.db.query(query, clause)

        return response.rows
    }

    async updateStatus(updateTaskStatus: UpdateTaskStatus) {
        const query =
            'UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *'
        const clauses = [
            updateTaskStatus.status,
            updateTaskStatus.task_id,
            updateTaskStatus.user_id,
        ]

        const response = await this.db.query(query, clauses)

        return response.rows[0]
    }

    async updateById(updateTask: UpdateTask) {
        const query = `UPDATE tasks SET 
            title = COALESCE($1, title), 
            description = COALESCE($2, description),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3 AND user_id = $4
        RETURNING *
        `

        const clauses = [
            updateTask.title,
            updateTask.description,
            updateTask.task_id,
            updateTask.user_id,
        ]

        const response = await this.db.query(query, clauses)

        return response.rows[0]
    }

    async delete(deleteTask: DeleteTask) {
        const query = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2'

        const clauses = [deleteTask.task_id, deleteTask.user_id]

        const response = await this.db.query(query, clauses)

        return response
    }
}

export const taskRepository = new TaskRepository()
