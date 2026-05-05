import z from 'zod'

export const IdUserSchema = z.object({
    body: z.object({
        id: z.string(),
    }),
})

export type IdUser = z.infer<typeof IdUserSchema>['body']
