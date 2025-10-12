import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { FLEX_CTR } from '../../../ClassNames'
import { useMotionValue, useTransform, animate, motion } from 'framer-motion'
import ConicGradient from '../../../GenericComponents/ConicGradient'

const ProgressCircle = ({progress, color}) => {
    const count = useMotionValue(0)
    const rounded = useTransform(count, latest => Math.round(latest)+'%');

    const degree = progress * 360;

    useEffect(()=>{
        const controls = animate(count, progress * 100, {duration:1.2})
        return ()=> controls.stop();
    }, [progress]);

    return (
        <div className={twMerge('w-3/10 h-full py-1', FLEX_CTR)}>
            <div className={twMerge(
                'size-17 border rounded-full',
                FLEX_CTR
            )}>
                <ConicGradient animateStart={true} color={color} degree={degree}>
                    <motion.span 
                        className={`
                            absolute inset-0 m-auto bg-black 
                            text-white text-center content-center 
                            rounded-full size-8/10 border
                        `}
                    >
                        {rounded}
                    </motion.span>
                </ConicGradient>
            </div>
        </div>
    )
}

export default ProgressCircle
