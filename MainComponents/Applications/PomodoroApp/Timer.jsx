import React from 'react';
import Stopwatch from './Stopwatch/Stopwatch';
import { FLEX_BTW } from '../../../ClassNames';
import { twMerge } from 'tailwind-merge';
import TimerName from './TimerName';
import Session from './Session';
import { motion } from 'framer-motion';
import useTimer from '../../../hooks/useTimer';
import { useSelector } from 'react-redux';

const Timer = ({onClick, pomodoro}) => {
    const { fullSize } = useSelector(state => state.pomodoro);

    useTimer(pomodoro);

    return (
        <motion.div 
            layoutId={'pomodoro'+pomodoro.id} 
            className={twMerge(
                'flex gap-1 px-2 py-3 border rounded-xl',
                (fullSize.status) && 'hidden'
            )}
        >
            <div 
                title='Click for more info'
                onClick={onClick} 
                className='w-6/10 cursor-pointer'
            >
                <TimerName name={pomodoro.name} id={pomodoro.id} />
                <div className={twMerge('px-3 gap-3 py-2',FLEX_BTW)}>
                    <Session 
                        label='Focus' 
                        borderClr='border-green-500 shadow-green-500'
                        bgClr='bg-green-500' 
                        clr='bg-green-500'
                        pomodoro={pomodoro}
                    />
                    <Session 
                        label='Break' 
                        borderClr='border-blue-500 shadow-blue-500'
                        bgClr='bg-blue-500' 
                        clr='bg-blue-500'
                        pomodoro={pomodoro}
                    />
                </div>
            </div>
            <div className='w-4/10 content-center'>
                <Stopwatch 
                    size='size-20' 
                    controls='c' 
                    timerStyles='text-lg'
                    pomodoro={pomodoro}
                />
            </div>
        </motion.div>
    )
}

export default Timer;