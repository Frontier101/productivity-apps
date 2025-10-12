import React from 'react'
import { motion } from 'framer-motion';

const Icon = ({name, onClick, src}) => {
    return (
        <motion.div 
            whileHover={{scale:1.1 , transition: { duration: .6 }}}
            className='text-center shadow-xl'
        >
            <motion.button 
                layoutId={name + ' App'}
                className='size-[7rem]'
                onClick={onClick}
            >
                <img 
                    src={src} 
                    alt={name+' icon'} 
                    className={src.includes('pomodoro') ? '' : 'mx-2'} 
                />
            </motion.button>
            <p><strong>{name}</strong></p>
        </motion.div>
    )
}

export default Icon;