import React, { useEffect, useState } from 'react'
import { BACKGROUND, BORDER } from '../../ClassNames';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';


const AppWindow = ({name, onClick, App}) => {
    const [isMobOrTab, setIsMobOrTab] = useState(window.innerWidth < 1024)

    useEffect(()=>{
        const handleResize = () => setIsMobOrTab(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    
    return (
        <motion.div
            layoutId={name + ' App'}
            initial={{opacity:0, scale:0.2}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0, scale:.9}}
            transition={{duration:.5, ease:'easeInOut'}}
            className={twMerge(
                `w-[clamp(20rem,60rem,95vw)] 
                h-[clamp(20rem,87%,60rem)] 
                min-h-[32rem] rounded-lg absolute 
                z-0 translate-y-2 lg:translate-y-7` , 
                BORDER.all , BACKGROUND
            )}
        >
            <div className='mb-3'>
                <button 
                    onClick={onClick}
                    className={
                        `size-10 float-right 
                        text-gray-500 hover:text-gray-700`
                    }
                >
                    <XMarkIcon />
                </button>
                <h3 className='text-center'>
                    {name + ' App'}
                </h3>
            </div>
            <App isMobOrTab={isMobOrTab}/>
        </motion.div>
    )

}

export default AppWindow;