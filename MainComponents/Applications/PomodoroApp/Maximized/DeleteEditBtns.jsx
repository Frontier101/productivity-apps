import React from 'react'
import OptionBtn from '../../../../GenericComponents/OptionBtn'
import TrashIcon from '@heroicons/react/20/solid/TrashIcon'
import PencilSquareIcon from '@heroicons/react/16/solid/PencilSquareIcon'
import { pomodoroActions } from '../../../../features/PomodoroSlice/pomodoroSlice'
import { useDispatch } from 'react-redux'

const DeleteEditBtns = ({pomodoro}) => {
    const dispatch = useDispatch();
    
    function handleEdit(){
        dispatch(pomodoroActions.setOpenForm({
            id:pomodoro.id,
            status:true, 
            title:'Edit This Pomodoro'
        }));
        dispatch(pomodoroActions.setForm(pomodoro));

    }
    function handleDelete(){
        dispatch(pomodoroActions.deletePomodoro(pomodoro.id));
        dispatch(pomodoroActions.setFullSize({status:false}));
    }

    return (
        <div className='w-full flex gap-3 text-white'>
            <OptionBtn 
                text='Delete'
                onClick={handleDelete}
                Icon={TrashIcon}
                className='grow p-2 border bg-red-500'
            />
            <OptionBtn 
                text='Edit'
                onClick={handleEdit}
                Icon={PencilSquareIcon}
                className='grow p-2 border bg-black'
            />
    </div>
    )
}

export default DeleteEditBtns
