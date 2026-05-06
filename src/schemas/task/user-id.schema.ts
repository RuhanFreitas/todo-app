import z from 'zod'

export const UserIdSchema = z.object({
    body: z.object({
        user_id: z.coerce.number().int().positive(),
    }),
})

export type UserId = z.infer<typeof UserIdSchema>['body']
