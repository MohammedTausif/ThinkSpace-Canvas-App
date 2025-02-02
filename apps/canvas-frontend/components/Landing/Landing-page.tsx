import React from "react";
import {motion} from 'framer-motion'

const LandingPage=()=> {
  return (
    <div className="relative h-full w-full bg-white">
         <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                damping: 10
            }}
            // className='flex w-full flex-col justify-between gap-12 rounded-2xl bg-gray-400/15  p-8 sm:max-w-[26rem]'
        >
        <div className="h-screen absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:23px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <div>
                <div className="for logo flex justify-center items-center">
                    <div className="text-2xl md:text-5xl lg:text-5xl bg-gradient-to-t from-gray-300 to-black  bg-clip-text font-black text-transparent  relative top-20 flex justify-center items-center">
                        Welcome to Collaborative, {'  '} 
                        <span>{' '} </span>
                       <div className="bg-gray-50 shadow-sm rounded "> <span className="md:text-6xl text-3xl  bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text font-black text-transparent cursor-pointer">
                           {' '}  WhiteBoard!
                        </span>
                        </div>
                        
                    </div>
                </div>
                <div className="for button">
                    Get started 

                </div>
            </div>
            </motion.div>
            </div>
      );
    }


export  {LandingPage}
