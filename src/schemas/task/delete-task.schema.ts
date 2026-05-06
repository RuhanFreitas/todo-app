import z from 'zod'

export const DeleteTaskSchema = z.object({
    body: z.object({
        task_id: z.coerce.number().int().positive(),
        user_id: z.coerce.number().int().positive(),
    }),
})

export type DeleteTask = z.infer<typeof DeleteTaskSchema>['body']
