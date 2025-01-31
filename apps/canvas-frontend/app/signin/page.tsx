"use client"
import { motion} from 'framer-motion'
import { useRef } from 'react'


const Signin= ()=>{
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null);
    return(
        <section className='wrapper relative min-h-screen flex items-center justify-center'>
            <motion.div
            initial = {{y:-40, opacity:0}}
            animate= {{y:0, opacity:1}}
            transition={{
                duration:0.5,
                ease: 'easeInOut',
                type: 'spring',
                damping: 10
            }}
            className='flex w-full flex-col justify-between gap-12 rounded-2xl bg-primary/5 p-8 sm:max-w-[26rem]'
            >
                <div>
                    <h2>
                        Welcome to {' '}
                        <span>
                            100xDevs
                        </span>
                    </h2>
                    <p>
                        login to share the content
                    </p>
                </div>
                <div>
                    <div>
                        <div>
                            <label htmlFor="email">Email</label>
                            input
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Signin