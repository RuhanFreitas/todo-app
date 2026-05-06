import { Router } from "express";
import { taskController } from "../controllers/task.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { CreateTaskSchema } from "../schemas/task/create-task.schema.ts";
import { IdTaskSchema } from "../schemas/task/id-task.schema.ts";
import { UserIdSchema } from "../schemas/task/user-id.schema.ts";
import { UpdateTaskStatusSchema } from "../schemas/task/update-task-status.schema.ts";
import { UpdateTaskSchema } from "../schemas/task/update-task.schema.ts";
import { DeleteTaskSchema } from "../schemas/task/delete-task.schema.ts";

const taskRouter = Router()

// Create task
taskRouter.post('/', validate(CreateTaskSchema), (req, res) => taskController.create(req, res))

// Find tasks by id
taskRouter.get('/', validate(IdTaskSchema), (req, res) => taskController.findById(req, res))

// Find all tasks by user id
taskRouter.get('/all', validate(UserIdSchema), (req, res) => taskController.findAll(req, res))

// Update task Status by id
taskRouter.patch('/update-status', validate(UpdateTaskStatusSchema) ,(req, res) => taskController.updateStatus(req, res))

// Update task information by id
taskRouter.patch('/update', validate(UpdateTaskSchema), (req, res) => taskController.updateById(req, res))

// Delete task by id
taskRouter.delete('/', validate(DeleteTaskSchema), (req, res) => taskController.delete(req, res))

export default taskRouter