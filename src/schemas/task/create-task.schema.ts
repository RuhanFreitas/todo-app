import z from 'zod'

export const CreateTaskSchema = z.object({
    body: z.object({
        user_id: z.coerce.number().int().positive(),
        title: z.string(),
        description: z.string(),
    }),
})

export type CreateTask = z.infer<typeof CreateTaskSchema>['body']
