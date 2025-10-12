import React from 'react'
import { twMerge } from 'tailwind-merge'
import { FLEX_CTR, FLEX_EVN } from '../../../../ClassNames'
import Session from '../Session'
import ArrowPathIcon from '@heroicons/react/16/solid/ArrowPathIcon'
import PlayPause from '../PlayPause'
import { pomodoroActions } from '../../../../features/PomodoroSlice/pomodoroSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from '../../../../features/helperFunctions'

const SessionsAndControls = () => {
    const { fullSize, pomodoroList } = useSelector(state => state.pomodoro);
    const dispatch = useDispatch();

    const pomodoro = pomodoroList[getItem('id', fullSize.id, pomodoroList)];
    
    function handleReset(){
        dispatch(pomodoroActions.resetTimer(pomodoro.id))
    }

    return (
        <div className={twMerge('gap-4', FLEX_EVN)}>
            <Session 
                label='Focus' 
                borderClr='border-green-500 shadow-green-500'
                bgClr='bg-green-500'
                clr='bg-green-500'
                pomodoro={pomodoro}
            />
            <div className={twMerge('gap-4',FLEX_CTR)}>
                <button
                    title='Reset Timer'
                    onClick={handleReset} 
                    className='size-8 border'
                >
                    <ArrowPathIcon />
                </button>
                <PlayPause 
                    className='size-8 border'
                    pomodoro={pomodoro}
                />
            </div>
            <Session 
                label='Break' 
                borderClr='border-blue-500 shadow-blue-500' 
                bgClr='bg-blue-500'
                clr='bg-blue-500'
                pomodoro={pomodoro}
            />
        </div>
    )
}

export default SessionsAndControls;