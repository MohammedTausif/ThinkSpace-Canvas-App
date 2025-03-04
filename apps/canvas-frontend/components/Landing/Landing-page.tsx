import React from "react";
import {motion} from 'framer-motion'
import Hero from "./Hero";
import Navbar from "../Navbar/Navbar";

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
          >
            <Navbar />
            <div className="h-screen absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:23px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <Hero/>
            </motion.div>
            </div>
      );
    }


export  {LandingPage}
