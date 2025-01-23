import { z } from 'zod'

export const SignupUserSchema = z.object({
    username: z.string().min(3).max(25),
    password: z.string().min(6).max(20),
    name: z.string()
})

export const SigninUserSchema = z.object({
    username: z.string().min(3).max(25),
    password: z.string().min(6).max(20),

})

export const CreateRoomSchema = z.object({
    name:z.string().min(4).max(10)
})