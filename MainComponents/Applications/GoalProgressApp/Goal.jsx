import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FLEX_BTW, FLEX_CTR } from '../../../ClassNames'
import Options from './Options';
import ProgressCircle from './ProgressCircle';
import ExpandIcon from '@heroicons/react/16/solid/ChevronDoubleDownIcon'
import CollapseIcon from '@heroicons/react/16/solid/ChevronDoubleUpIcon'
import MoreInfo from './MoreInfo';
import { AnimatePresence } from 'framer-motion';
import AnimatedItem from '../../../GenericComponents/AnimatedItem';

const Goal = ({goal}) => {
    const [moreInfo, setMoreInfo] = useState(false);

    const progress = (goal.completedSteps / goal.totalSteps);
    const day = new Date(goal.deadline).getDate();
    const month = new Date(goal.deadline).toLocaleString('en-US', {month:'short'});

    const diff = Date.now() - new Date(goal.deadline) 

    return (
        <AnimatedItem className='w-full relative border rounded-xl pb-4 md:pe-5'>
            <div className={twMerge('h-2/10 p-1', FLEX_CTR)}>
                <ProgressCircle 
                    color={ 
                        diff < 0 || goal.totalSteps == goal.completedSteps
                        ? 'green' : 'red'
                    }
                    progress={progress} 
                />
                <div className='grow h-full p-1 ps-0 flex flex-col gap-1'>
                    <p className='w-9/10 font-medium text-xl text-center '>
                        {goal.name}
                    </p>
                    <div className={twMerge(
                        'w-9/10 h-full px-2 ',
                        FLEX_BTW
                    )}>
                        <p className={`
                            border text-sm py-1 px-2 
                            rounded-xl bg-black text-white
                        `}>
                            {day + ' ' + month}
                        </p>
                        
                        <div>
                            <p>{
                                goal.completedSteps + 
                                ' / ' +
                                goal.totalSteps
                            }</p>
                        </div>
                    </div>
                </div>
                <Options goal={goal}/>
            </div>
            <AnimatePresence>
                {moreInfo && <MoreInfo goal={goal}/>}
            </AnimatePresence>
            <button 
                onClick={()=>{setMoreInfo(!moreInfo)}}
                className='absolute bottom-0 right-1'
            >
                {
                    moreInfo 
                    ? <CollapseIcon className='h-5' />
                    : <ExpandIcon className='h-5'/>
                }
            </button>
        </AnimatedItem>
    )
}

export default Goal;