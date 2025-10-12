import React from 'react'
import Timer from './Timer'
import Maximized from './Maximized/Maximized';
import { AnimatePresence } from 'framer-motion';
import { LIST_BG } from '../../../ClassNames';
import { twMerge } from 'tailwind-merge';
import ToggleBtn from '../../../GenericComponents/ToggleBtn';
import { useDispatch, useSelector } from 'react-redux';
import PlusIcon from '@heroicons/react/20/solid/PlusIcon';
import { pomodoroActions } from '../../../features/PomodoroSlice/pomodoroSlice';
import { getItem } from '../../../features/helperFunctions';
import AddNewPomodoro from './AddNewPomodoro/AddNewPomodoro';

const PomodoroApp = ({isMobOrTab}) => {
    const { openForm, pomodoroList, fullSize } = useSelector(state => state.pomodoro);
    const dispatch = useDispatch();

    const currentPomodoro = pomodoroList[getItem(
        'id', fullSize.id, pomodoroList
    )];

    function handleOpenForm(){
        dispatch(pomodoroActions.setOpenForm({
            status:!openForm.status,
            title:'Add A New Pomodoro'
        }))
    }
    
    function handleFullSize(id){
        dispatch(pomodoroActions.setFullSize({status:true,id}))
    }

    const pomodoros = pomodoroList.map(pomodoro =>(
        <Timer 
            key={pomodoro.id}
            onClick={()=>handleFullSize(pomodoro.id)}
            pomodoro={pomodoro}
        />
    ));

    return (
        <div className={
            `w-full h-9/10 p-3 gap-1 flex justify-between 
            flex-col items-center lg:flex-row`
        }>
            <div className={twMerge('lg:w-7/10 relative space-y-4', LIST_BG)}>
                {fullSize.status && <Maximized pomodoro={currentPomodoro} />}
                {pomodoros}
            </div>
            <AnimatePresence>
                {(openForm.status || !isMobOrTab) && <AddNewPomodoro />}
            </AnimatePresence>
            {isMobOrTab && <ToggleBtn 
                titles={['Cancel','Add A Pomodoro']}
                classNames={[
                    'bg-blue-800 rounded-full text-white float-end', 
                    'bg-red-600'
                ]}
                state={openForm.status}
                handler={handleOpenForm}
                Icon={PlusIcon}
                size={'size-10'}
            />}
        </div>
    )
}

export default PomodoroApp;