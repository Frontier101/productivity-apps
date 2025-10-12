import React from 'react';
import EllipsisVerticalIcon from '@heroicons/react/16/solid/EllipsisVerticalIcon'
import { motion } from 'framer-motion';
import EditIcon from '@heroicons/react/16/solid/PencilSquareIcon'
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import Popup from '../../../GenericComponents/Popup';
import { useDispatch } from 'react-redux';
import { goalsActions } from '../../../features/GoalSlice/GoalSlice';
import { twMerge } from 'tailwind-merge';
import OptionBtn from '../../../GenericComponents/OptionBtn';

const Options = ({goal}) => {
    const dispatch = useDispatch();

    function handleEdit(){
        dispatch(goalsActions.setOpenForm({
            id:goal.id,
            status:true, 
            title:'Edit This Goal'
        }));
        dispatch(goalsActions.setForm(goal));
    }

    function handleDelete(){
        dispatch(goalsActions.removeGoal(goal.id));
    }

    return (
        <Popup
            Icon={EllipsisVerticalIcon}
            className={['relative' ,'w-5 h-10 cursor-pointer']}
        >
            <motion.div
                initial={{opacity:0, scale:0}}
                animate={{opacity:1, scale:1}}
                exit={{opacity:0, scale:0}}
                transition={{duration:.3}}
                className={`
                    w-25 p-2 origin-top-right absolute 
                    -bottom-full bg-black text-white rounded-lg right-full space-y-2
                `}
            >
                <OptionBtn 
                    text='Edit'
                    onClick={handleEdit}
                    Icon={EditIcon}
                />
                <OptionBtn 
                    text='Delete'
                    onClick={handleDelete}
                    Icon={TrashIcon}
                    className={'text-red-300'}
                />
            </motion.div>
        </Popup>
    )
}

export default Options;