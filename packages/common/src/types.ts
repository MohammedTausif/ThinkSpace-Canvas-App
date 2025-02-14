import { z } from 'zod'

export const SignupUserSchema = z.object({
    email: z.string().email().min(3).max(25, {
        message: "Email is Required"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters "
    }).max(20, {
        message: "Password is required"
    }),
    name: z.string().min(4)
})

export const SigninUserSchema = z.object({
    email: z.string().email().min(3).max(25),
    password: z.string().min(6, "Password must be at least 6 characters").max(20),

})

export const CreateRoomSchema = z.object({
    name: z.string().min(4, "Minimum 4 digit name is Required ").max(20, "Maximum 20 words names are allowded")
})

export type SigninInput = z.infer <typeof SigninUserSchema>
export type SignUpInput = z.infer<typeof SignupUserSchema>
export type CreateRoomInput = z.infer<typeof CreateRoomSchema>