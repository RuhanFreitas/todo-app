import z from 'zod'

export const UpdateTaskStatusSchema = z.object({
    body: z.object({
        task_id: z.coerce.number().int().positive(),
        user_id: z.coerce.number().int().positive(),
        status: z.enum(['PENDING', 'COMPLETED', 'ONGOING']),
    }),
})

export type UpdateTaskStatus = z.infer<typeof UpdateTaskStatusSchema>['body']
