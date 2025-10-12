import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pomodoroActions } from '../../../../features/PomodoroSlice/pomodoroSlice';
import { getItem, timeCounter } from '../../../../features/helperFunctions';
import { FLEX_EVN } from '../../../../ClassNames';

const TimeMetrics = memo(() => {
    const { fullSize, pomodoroList } = useSelector(state => state.pomodoro);
    const dispatch = useDispatch();

    const index = getItem('id', fullSize.id, pomodoroList);
    const { id, totalDuration, isPlay, realTime, counter, sessions } = pomodoroList[index];

    const session =  sessions['Break'].numOfSessions;

    const remaining = timeCounter(totalDuration);
    const elapsed = timeCounter(counter);

    useEffect(()=>{
        if(!isPlay && session.at(-1) === 0){
            const updateTime = ()=>{
                const now = new Date();
                dispatch(pomodoroActions.setRealTime({
                    id,
                    time:(new Date(
                        now.getTime() + 
                        totalDuration + 
                        2000 * (session.length+1)
                    ).toISOString()),
                }));
            }
            const interval = setInterval(updateTime,1000);
            return ()=>clearInterval(interval);
        }
    },[isPlay]);

    return (
        <div className='space-y-2'>
            <TimeInfo 
                label='Elapsed Time : '
                output={`${elapsed.hours}h : ${elapsed.minutes}m : ${elapsed.secs}s`}
            />
            <TimeInfo 
                label='Remaining Time : '
                output={`${remaining.hours}h : ${remaining.minutes}m : ${remaining.secs}s`}
            />
            <TimeInfo 
                label={totalDuration ? 'Expected To End At : ' : 'Ended At : '}
                output={realTime ? new Date(realTime).toLocaleTimeString() : 'Calculating...'}
            />
            <hr />
        </div>
    );
})

export default TimeMetrics;

function TimeInfo({label, output}){
    return(
        <>
            <hr />
            <div className={FLEX_EVN}>
                <p><strong>{label}</strong></p>
                <p> {output} </p>
            </div>
        </>
    )
}
