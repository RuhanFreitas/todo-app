import z from 'zod'

export const IdTaskSchema = z.object({
    body: z.object({
        id: z.coerce.number().int().positive(),
        user_id: z.coerce.number().int().positive(),
    }),
})

export type IdTask = z.infer<typeof IdTaskSchema>['body']
