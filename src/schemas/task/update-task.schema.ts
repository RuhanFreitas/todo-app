import z from 'zod'

export const UpdateTaskSchema = z.object({
    body: z.object({
        task_id: z.coerce.number().int().positive(),
        user_id: z.coerce.number().int().positive(),
        title: z.string().optional,
        description: z.string().optional,
    }),
})

export type UpdateTask = z.infer<typeof UpdateTaskSchema>['body']
