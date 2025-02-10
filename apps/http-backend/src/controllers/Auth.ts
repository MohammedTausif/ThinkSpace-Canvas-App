import { SigninUserSchema, SignupUserSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import { Request, Response } from "express"
import bcrypt from 'bcryptjs'
import { JWT_SECRET } from "@repo/backend-common/config"
import  Jwt  from "jsonwebtoken"


//http:localhost:4000/api/v1/user/signup => POST
export const signup = async(req: Request, res:Response)=>{
    
    const ParsedData=  SignupUserSchema.safeParse(req.body)

    const Password = ParsedData.data?.password || "" ;
    const HashedPassword = await bcrypt.hash(Password, 9)
    if(!ParsedData.success){
        console.log(ParsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try{
        const user = await prismaClient.user.create({
            data:{
                email: ParsedData.data?.email,
                password: HashedPassword,
                name: ParsedData.data?.name,
            }
        })
        console.log("user signed up" , user)
        res.json({
            message: "User created Successfully"
        })

    }catch(e){
        res.status(411).json({
            message: "User already exist with this username",
             error: e
        })

    }
}


//http:localhost:4000/api/v1/user/signin => POST
export const signin = async (req:Request, res:Response)=>{
    const parsedData = SigninUserSchema.safeParse(req.body)

    if(!parsedData.success){
        console.log(parsedData.error)
        return
    }

    try{
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        })
        if(!user){
            res.status(403).json({
                message: "User doesn't exist with this username"
            })
        }
        else if(user){
            const passwordMatch = await bcrypt.compare(parsedData.data.password , user.password)
            if(passwordMatch){
                const token = Jwt.sign({
                    userId: user?.id
                }, JWT_SECRET)

                res.json({
                    message: "User signed In",
                    token : token
                })
            }
            else {
                res.status(403).json({
                    message: "Wrong Password"
                })
            }
        }
    }catch(error){
        console.log(error)
        res.json({
            error: error
        })
    }

}