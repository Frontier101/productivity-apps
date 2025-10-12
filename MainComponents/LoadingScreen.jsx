import { motion } from 'framer-motion';
import React from 'react'


const LoadingScreen = () => {
    return (
        <div className='w-screen h-screen bg-[aquamarine] content-center'>
            <motion.div 
                initial={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{
                    duration:.6,
                    repeat:Infinity,
                    repeatType:'reverse',
                }}
                className='rounded-full mx-auto bg-indigo-500 w-[5rem] h-[5rem]'
            />
        </div>
    )
}

export default LoadingScreen;
