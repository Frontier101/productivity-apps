import React, { useEffect, useState } from 'react'
import PauseIcon from '@heroicons/react/16/solid/PauseIcon';
import PlayIcon from '@heroicons/react/16/solid/PlayIcon';
import { useDispatch } from 'react-redux';
import { pomodoroActions } from '../../../features/PomodoroSlice/pomodoroSlice';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';


const PlayPause = ({className, pomodoro}) => {
    const [disabled, setDisabled] = useState(false);
    const { id, isPlay, totalDuration, counter } = pomodoro;
    const dispatch = useDispatch();

    useEffect(()=>{
        setDisabled(true);
        const timeout = setTimeout(()=>{
            setDisabled(false);
        },1000)
        return ()=>clearTimeout(timeout);
    },[]);

    function handlePlay(){
        dispatch(pomodoroActions.setIsPlay(id));
    }

    return (
        <motion.button
            layoutId={'play-pause'+id}
            disabled={disabled}
            className={twMerge('disabled:text-stone-700',className)} 
            onClick={handlePlay}
        >
            {isPlay 
                ? <PauseIcon title='pause Timer'/> 
                : <PlayIcon title={
                    totalDuration > 0 
                    ? counter > 0 ? 'Resume Timer' : 'Start Timer'
                    : 'Timer Finished' 
                }/>
            }
        </motion.button>
    )
}

export default PlayPause;