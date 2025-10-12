import React from 'react'
import ArrowLeftIcon from '@heroicons/react/16/solid/ArrowLeftIcon'
import TimerName from '../TimerName'
import Stopwatch from '../Stopwatch/Stopwatch'
import { twMerge } from 'tailwind-merge'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import SessionInfo from './SessionInfo'
import TimeMetrics from './TimeMetrics'
import DeleteEditBtns from './DeleteEditBtns'
import SessionsAndControls from './SessionsAndControls'
import { pomodoroActions } from '../../../../features/PomodoroSlice/pomodoroSlice';
import { FLEX_EVN } from '../../../../ClassNames'


const Maximized = ({pomodoro}) => {
    const dispatch = useDispatch();

    function handleFullSize(){
        dispatch(pomodoroActions.setFullSize({status:false}));
    }

    return (
        <motion.div
            layoutId={'pomodoro'+pomodoro.id}
            initial={{height:'25%'}}
            animate={{height:'100%'}}
            exit={{height:'25%'}}
            className= 'size-full border rounded-xl p-2 overflow-auto'
        >
            <button onClick={handleFullSize} className='size-6'>
                <ArrowLeftIcon />
            </button>
            <div className='space-y-4'>
                <TimerName name={pomodoro.name} id={pomodoro.id} />
                <div className={twMerge('px-3',FLEX_EVN)}>
                    <SessionInfo clr='bg-green-500' session='Focus'/>
                    <Stopwatch pomodoro={pomodoro} size='size-30' timerStyles='text-2xl mt-4'/>
                    <SessionInfo clr='bg-blue-500' session='Break'/>
                </div>
                <SessionsAndControls />
                <TimeMetrics />
                <div className={twMerge('text-center',FLEX_EVN)}>
                    <strong>Related Todo Task : </strong>
                    {pomodoro.relatedTodo.todo ? pomodoro.relatedTodo.todo.name : '---'}
                </div>
                <DeleteEditBtns pomodoro={pomodoro}/>
            </div>
        </motion.div>
    )
}

export default Maximized;