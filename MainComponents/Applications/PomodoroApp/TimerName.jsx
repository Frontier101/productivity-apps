import React from 'react'
import { motion } from 'framer-motion'


const TimerName = ({name, id}) => {

    return (
        <motion.p 
            layoutId={'timerName'+id}
            className='text-center text-[1.4rem] content-center size-auto'
        >
            {name}
        </motion.p>
    )
}

export default TimerName
