import React from 'react'
import { useSelector } from 'react-redux';
import Indicator from '../Stopwatch/Indicator';
import { twMerge } from 'tailwind-merge';
import { getItem } from '../../../../features/helperFunctions';


const SessionInfo = ({clr,session}) => {
    const { fullSize, pomodoroList } = useSelector(state => state.pomodoro);

    const index = getItem('id', fullSize.id, pomodoroList);
    const { sessions } = pomodoroList[index >= 0 ? index : 0];
    const duration = sessions[session].duration;

    return(
        <div title={session+' Duration'} className='text-sm w-2/10'>
            <Indicator className={twMerge('mx-auto',clr)}/>
            <TimeLength time={duration.h} label=' h'/>
            <TimeLength time={duration.min} label=' min'/>
            <TimeLength time={duration.sec} label=' sec'/>
        </div>
    )
}

export default SessionInfo;

function TimeLength({time, label}){
    return(
        <>
            {time > 0 && <p className='pb-1 text-center'>
                {time+label + (time > 1 ? 's' : '')}
            </p>}
        </>
    )
}
