import { z } from 'zod'

export const SignupUserSchema = z.object({
    username: z.string().email().min(3).max(25, {
        message: "Email is Required"
    }),
    password: z.string().min(6,{
        message: "Min 6 digit is required "
    }).max(20, {
        message: "Password is required"
    }),
    name: z.string().min(4)
})

export const SigninUserSchema = z.object({
    username: z.string().email().min(3).max(25),
    password: z.string().min(6,"Password must be at least 6 characters").max(20),

})

export const CreateRoomSchema = z.object({
    name:z.string().min(4).max(10)
})