"use client"
import { Button } from '../ui/AuthButton'
import { ChangeEvent, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { HTTP_URL } from '@/config'
import { SigninUserSchema, SigninInput } from '@repo/common/types'


const emailDomains = [
    'gmail.com',
    'outlook.com'
]

const Signin = () => {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null);
    const [signInData, setSignInData] = useState<SigninInput>({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    function HandlePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState)
    }

    // Fn to set username , password value management
    function HandleChange(e: ChangeEvent<HTMLInputElement>) {
        setSignInData({ ...signInData, [e.target.name]: e.target.value })
    }

    const ValidData = SigninUserSchema.safeParse(signInData)
    // console.log("signin credentials", ValidData)

    async function handleSignin() {
        if (!ValidData.success) {
            const formatErrors = ValidData.error.format();
            setErrors({
                email: formatErrors.email?._errors[0] || "",
                password: formatErrors.password?._errors[0] || ""
            })
        }
        setErrors({});
        try {
            const userData = ValidData.data
            const response = await axios.post(`${HTTP_URL}/api/v1/user/signin`, {
                email: userData?.email,
                password: userData?.password
                
            })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt)
            router.push(`/canvas/:roomId`)
        }
        catch (error) { 
            console.error("error is:", error)
        }
    }


    return (
        <section className='p-4 wrapper relative min-h-screen flex items-center justify-center overflow-hidden antialiased'>
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    type: 'spring',
                    damping: 10
                }}
                className='flex w-full flex-col justify-between gap-12 rounded-2xl bg-gray-400/15  p-8 sm:max-w-[26rem]'
            >
                <div className='flex flex-col text-center '>
                    <h2 className=' text-3xl font-semibold tracking-tighter xl:text-3xl '>
                        Welcome to {' '}
                        <span className='bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent '>
                            CollabxCanvas
                        </span>
                    </h2>
                    <p className='text-lg font-medium tracking-tighter text-gray-900/75'>
                        Log in to share the content!
                    </p>
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='grid w-full items-center gap-4 '>
                        <div className='relative flex flex-col gap-2'>
                            <label className='text-sm' htmlFor="email">Email</label>
                            <Input
                                className='focus:ring-none border-none bg-gray-500/10 focus:outline-none h-10 px-2 rounded-md'
                                name="email"
                                type={'text'}
                                onChange={HandleChange}
                                id="email"
                                placeholder='name@email.com'
                                ref={usernameRef}
                                value={signInData.email}
                            />
                            {errors.username && <p className='text-sm text-red-600'>{errors.username}</p>}
                        </div>
                        <div className='relative flex flex-col gap-2 '>
                            <div className='flex flex-col  '>
                                <label className='text-sm' htmlFor="password">Password</label>
                                <Input
                                    className='focus:ring-none focus:outline-none border-none bg-gray-500/10  h-10 px-2 rounded-md'
                                    name='password'
                                    id='password'
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='••••••••'
                                    ref={passwordRef}
                                    value={signInData.password}
                                    onChange={HandleChange}

                                    onKeyDown={async (e) => {
                                        if (e.key === 'Enter') {
                                            handleSignin()
                                        }
                                    }}
                                />
                                 <button
                                    className='absolute bottom-0 right-0 flex h-10 items-center px-4 text-neutral-500'
                                    onClick={HandlePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>

                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    )}
                                </button>
                               
                            </div>
                        </div>
                                {errors.password && <p className='text-sm text-red-600'>{errors.password}</p>}
                    </div>

                    <Button
                        className='text-[16px]'
                        title='Signin'
                        onClick={handleSignin}

                    />
                </div>
            </motion.div>
            <div className=' absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16rem] text-red-700 ' />
        </section>

    )
}
export { Signin }