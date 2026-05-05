import z from 'zod'

export const CreateUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name must have 3 characters or more'),
        email: z.email('Please, use a valid email'),
        password: z.string().min(6, 'Password must have 6 characters or more'),
    }),
})

export type CreateUser = z.infer<typeof CreateUserSchema>['body']
