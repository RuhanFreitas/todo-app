import z from 'zod'

export const LoginUserSchema = z.object({
    body: z.object({
        email: z.email('Please, use a valid email'),
        password: z.string().min(6, 'Password must have 6 characters or more'),
    }),
})

export type LoginUser = z.infer<typeof LoginUserSchema>['body']






