import z from 'zod'

export const IdUserSchema = z.object({
    body: z.object({
        id: z.coerce.number().int().positive(),
    }),
})

export type IdUser = z.infer<typeof IdUserSchema>['body']
