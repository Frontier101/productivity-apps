import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pomodoroActions } from '../../../../features/PomodoroSlice/pomodoroSlice';
import NumInput from '../../../../GenericComponents/NumInput';
import { getDuration } from '../../../../features/helperFunctions';


const SessionDuration = ({label}) => {
    const [isValid, setIsValid] = useState(true);
    const { form } = useSelector(state => state.pomodoro);
    const dispatch = useDispatch();

    const duration = form.sessions[label].duration;

    useEffect(()=>{
        getDuration(duration) === 0
        ? setIsValid(false)
        : setIsValid(true)
    },[form])

    function action(value, name){
        dispatch(pomodoroActions.setDuration({
            label, duration:{[name]:value}
        }))
    }

    return(
        <label className='flex flex-wrap gap-2 justify-center px-1 pb-2'>
            <strong>{label+' Session Duration : '}</strong>
            <div className='flex gap-2'>
                <NumInput 
                    width={'w-10 ' + (!isValid && ' border-red-500') }
                    name='h' 
                    value={duration.h} 
                    action={action} 
                    min={0} 
                    max={1}
                />
                <NumInput 
                    width={'w-10 '+(!isValid && ' border-red-500') }
                    name='min' 
                    value={duration.min} 
                    action={action} 
                    min={0} 
                    max={59}
                />
                <NumInput 
                    width={'w-10 '+(!isValid && ' border-red-500') }
                    name='sec' 
                    value={duration.sec} 
                    action={action} 
                    min={0} 
                    max={59}
                />
            </div>
        </label>
    )
}

export default SessionDuration;
