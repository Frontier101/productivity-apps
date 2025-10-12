import React from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

const FormModal = ({styles, children}) => {
    return (
        <motion.div
            initial={{opacity:0, y:-10}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, x:-60}}
            className={
                twMerge(
                    `absolute bottom-1/2 right-1/2 
                    translate-1/2 overflow-auto 
                    px-2 pb-4 pt-2 mb-3
                    border-5 h-105 w-62
                    lg:static lg:py-2 lg:left-1
                    lg:h-99 mt-2 lg:translate-0`,
                    styles
                )
            }
        >
            {children}
        </motion.div>
    )
}

export default FormModal;