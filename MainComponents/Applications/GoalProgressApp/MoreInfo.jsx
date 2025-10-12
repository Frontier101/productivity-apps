import React from 'react'
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import { motion } from 'framer-motion';
import { TimeLeft } from '../../../features/GoalSlice/GoalHelpers';

const MoreInfo = ({goal}) => {

    const leftDays = TimeLeft(goal.deadline);
    const year = new Date(goal.deadline).getFullYear();
    
    return (
        <motion.div 
            initial={{height:'0'}}
            animate={{height:'auto'}}
            exit={{height:'0'}}
            className='flex w-full h-40 gap-2 p-1 overflow-hidden'
        >
            <div className='w-5/10 border py-1 px-2 overflow-auto'>
                <p className='text-center font-semibold text-sm mb-4'>
                    Related Tasks
                </p>
                <ul className='h-20 text-sm w-full space-y-2'>
                    {goal.completedSteps > goal.tasks.length && 
                        <li>
                            {goal.completedSteps - goal.tasks.length + ' Unknown'}
                        </li>
                    }
                    {goal.tasks.map(task=>(
                        <li 
                            key={task.id}
                            className='flex items-center gap-5 text-center'
                        >
                            <CheckIcon className='size-4 text-green-800' />
                            <p className='w-6/10 break-all'>{task.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='w-5/10'>
                <div className='flex justify-around items-center p-1'>
                    <div className='text-center'>
                        <strong>Days Left :</strong>
                        <p>{
                            goal.totalSteps > goal.completedSteps && leftDays >= 0
                            ? leftDays + (leftDays > 1 ? ' days' : ' day')
                            : '-'
                        }</p>
                    </div>
                    <div className='text-center'>
                        <p><strong>Year : </strong>{year}</p>
                    </div>
                </div>
                <strong>Notes : </strong>
                <div className={`
                    h-25 w-full bg-[rgba(255,255,255,.4)] 
                    px-2 py-1 break-all rounded-lg overflow-auto
                `}>
                    {goal.notes}
                </div>
            </div>
        </motion.div>
    )
}

export default MoreInfo;