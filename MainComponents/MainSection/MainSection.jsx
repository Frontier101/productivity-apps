import React, { useState } from 'react'
import Icon from './Icon';
import AppWindow from './AppWindow';
import { FLEX_CTR } from '../../ClassNames';
import { twMerge } from 'tailwind-merge';
import ToDoApp from '../Applications/To-Do-App/ToDoApp';
import GoalProgressApp from '../Applications/GoalProgressApp/GoalProgressApp';
import PomodoroApp from '../Applications/PomodoroApp/PomodoroApp';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { goalsActions } from '../../features/GoalSlice/GoalSlice';
import Timer from '../Applications/PomodoroApp/Timer';
import { todoActions } from '../../features/TodoSlice/TodoSlice';
import { pomodoroActions } from '../../features/PomodoroSlice/pomodoroSlice';



const MainSection = () => {
    const [open, setOpen] = useState('');
    const { pomodoroList } = useSelector(state => state.pomodoro);

    const dispatch = useDispatch();

    function onClose(){
        setOpen('');
        dispatch(todoActions.setOpenForm(false));
        dispatch(goalsActions.setOpenForm({status:false}));
        dispatch(pomodoroActions.setOpenForm({status:false}));
        dispatch(pomodoroActions.setFullSize({status:false}));
    }

    const appsIcon = Object.keys(getApps()).map(name => (
        <li key={name}>
            <Icon 
                onClick={()=> {
                    setTimeout(()=>{
                        setOpen(name);
                    }, 300)
                }} 
                name={name}
                src={`${import.meta.env.BASE_URL}${getApps()[name].iconSrc}.png`}
            />
        </li>
    ))

    const pomodoros = pomodoroList.filter(pomodoro =>(
        pomodoro.isPlay === true
    )).map(pomodoro =>(
        <Timer 
            key={pomodoro.id}
            pomodoro={pomodoro}
        />
    ));

    return (
        <div
            className= {twMerge(
                'p-2 m-0 overflow-hidden min-h-[calc(100vh-7rem)]',
                FLEX_CTR
            )} 
        >
            {open !== 'Pomodoro Timer' && <div className='hidden'>{pomodoros}</div>}
            <ul className={
                `flex flex-wrap justify-center
                gap-y-15 gap-x-80 w-[clamp(30rem,80%,40rem)] px-2 py-4 list-none`
            }>
                {appsIcon}
            </ul>
            <AnimatePresence>
            {open && 
                <AppWindow 
                    onClick={onClose} 
                    name={open}
                    App={getApps()[open].app}
                />
            }
            </AnimatePresence>
        </div>
    )
}

export default MainSection;

function getApps(){
    const apps = [
        ToDoApp, GoalProgressApp, PomodoroApp
    ];
    const appNames = [
        'To-Do', 'Goal Progress', 'Pomodoro Timer'
    ];
    const iconSrc = [
        'checklist', 'goal' , 'pomodoro'
    ]
    
    return Object.fromEntries(
        appNames.map((appName, i) =>(
            [appName, {app : apps[i], iconSrc :iconSrc[i]}]
        ))
    );
}