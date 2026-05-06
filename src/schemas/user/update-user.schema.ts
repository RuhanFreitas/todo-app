import z from 'zod'

export const UpdateUserSchema = z.object({
    body: z.object({
        id: z.coerce.number().int().positive(),
        name: z
            .string()
            .min(3, 'Name must have 3 characters or more')
            .optional(),
        email: z.email('Please, use a valid email').optional(),
        password: z
            .string()
            .min(6, 'Password must have 6 characters or more')
            .optional(),
    }),
})

export type UpdateUser = z.infer<typeof UpdateUserSchema>['body']
