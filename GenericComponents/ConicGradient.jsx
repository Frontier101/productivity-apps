import React from 'react'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

const ConicGradient = ({color, animateStart, degree, className, children}) => {
    return (
        <motion.div
            className={twMerge('size-full relative rounded-full',className)}
            {...(animateStart && 
                {initial:{
                    background:`conic-gradient(
                        ${color} 0deg 0deg,
                        transparent 0deg 360deg
                    )` 
                } }
            )}
            animate={{background:`conic-gradient(
                ${color} 0deg ${degree}deg,
                transparent ${degree}deg 360deg
            )`}}
            transition={{duration:animateStart ? 1.2 : .3, ease:'easeInOut'}}
        >
            {children}
        </motion.div>
    )
}

export default ConicGradient
