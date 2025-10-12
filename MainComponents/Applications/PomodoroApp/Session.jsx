import React from 'react'
import { twMerge } from 'tailwind-merge';
import { FLEX_CTR } from '../../../ClassNames';
import { motion } from 'framer-motion';
import Indicator from './Stopwatch/Indicator';

const Session = ({label, borderClr, bgClr, clr, pomodoro}) => {
    const { id, currentSession, sessions } = pomodoro;
    
    const numOfSessions = sessions[label].numOfSessions;
    const isCurrent = currentSession === label && !numOfSessions.at(-1);

    return (
        <motion.div
            layoutId={label+id} 
            className={twMerge(
                `px-2 py-1 gap-3 flex-col 
                rounded-2xl transition-colors 
                duration-1000 border-2 border shadow-lg`,
                isCurrent && borderClr, 
                FLEX_CTR
            )}
        >
            <p 
                className={twMerge(
                    'text-center rounded-lg p-1 duration-1000',
                    isCurrent && bgClr
                )}
            >
                {label}
            </p>
            <div className='grid grid-cols-3 gap-2' >
                {numOfSessions.map( (session,i) => (
                    <Indicator key={i} className={session && clr}  />
                ))}
            </div>
        </motion.div>
    )
}

export default Session;
