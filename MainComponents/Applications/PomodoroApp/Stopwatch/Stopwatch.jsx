import React from 'react'
import ConicGradient from '../../../../GenericComponents/ConicGradient';
import PlayPause from '../PlayPause';
import { ABS_CTR, FLEX_CTR } from '../../../../ClassNames';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { getDuration, timeCounter } from '../../../../features/helperFunctions';
import Dials from './Dials';


const Stopwatch = ({size, controls, timerStyles, pomodoro}) => {
    const { id, isPlay, seconds, currentSession, sessions } = pomodoro;

    const duration = getDuration(sessions[currentSession].duration);

    const {hours, minutes, secs} = timeCounter(duration - seconds);

    return (
        <motion.div 
            layoutId={"watch"+id}
            className={twMerge('flex-col',FLEX_CTR)}
        >
            <div className={twMerge('border rounded-full relative',size)}>
                <Dials />
                <Dials rotate='rotate-180'/>
                <ConicGradient
                    color={
                        !isPlay 
                            ? 'orange' 
                            : currentSession === 'Break' 
                                ? 'dodgerblue' 
                                : '#00c951'
                    }
                    degree={(seconds * 360)/duration}
                    className='border'
                >
                    {controls 
                        ? <PlayPause 
                            pomodoro={pomodoro} 
                            className='size-6 z-3 absolute inset-0 m-auto'
                        />
                        : (!isPlay && seconds>0) && 
                            <p className={twMerge('top-1/3 font-semibold text-xl',ABS_CTR)}>
                                Paused
                            </p>
                    }
                    
                    <div className={twMerge('w-0 h-1/2 border',ABS_CTR)}></div>
                    <div className='absolute inset-1/2 -translate-1/2 w-1 h-1 rounded-full bg-black'></div>
                    <motion.div 
                        initial={{rotate:(seconds * 360)/duration}}
                        animate={{rotate:(seconds * 360)/duration}}
                        transition={{duration:.3, ease:'easeInOut'}}
                        className='absolute size-full rounded-full'
                    >
                        <div 
                            className='m-auto w-0 h-1/2 border'
                        ></div>
                    </motion.div>
                </ConicGradient>
            </div>

            <p className={timerStyles}>
                {
                    sessions['Break'].numOfSessions.at(-1) 
                        ? 'Finished'
                        : !sessions['Focus'].numOfSessions[0] && seconds===0
                            ? "Let's start"
                            :  hours + ' : ' + minutes + ' : ' + secs
                }
            </p>

        </motion.div>
    )
}

export default Stopwatch;