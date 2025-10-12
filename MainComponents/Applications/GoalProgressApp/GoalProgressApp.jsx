import React from 'react';
import PlusIcon from '@heroicons/react/20/solid/PlusIcon';
import AddNewGoal from './AddNewGoal';
import ToggleBtn from '../../../GenericComponents/ToggleBtn';
import { AnimatePresence } from 'framer-motion';
import SelectItems from '../../../GenericComponents/SelectItems';
import { twMerge } from 'tailwind-merge';
import { FLEX_BTW, FLEX_CTR, LIST_BG } from '../../../ClassNames';
import useGoal from '../../../hooks/useGoal';
import { useSelector } from 'react-redux';


const GoalProgressApp = ({isMobOrTab}) => {
    const { openForm, sort } = useSelector(state => state.goals);
    
    const {handleOpenForm, handleSort, listMap} = useGoal();
    

    return (
        <div className={
            `w-full h-9/10 p-3 gap-1 flex justify-between 
            flex-col lg:items-center lg:flex-row`
        }>
            <div className={twMerge('lg:w-7/10 relative space-y-4', LIST_BG)}>
                {listMap.get(sort)}
            </div>
            <div className={twMerge('h-1/10 gap-2', FLEX_BTW)}>
                <div className= {twMerge('grow lg:flex-col', FLEX_BTW)}>
                    <AnimatePresence>
                        {(openForm.status || !isMobOrTab) && <AddNewGoal />}
                    </AnimatePresence>
                    <div className={twMerge('gap-3 grow lg:mb-3 lg:w-full',FLEX_CTR)}>
                        <SelectItems 
                            label='Sort by:'
                            value={sort}
                            onChange={handleSort}
                            items={[
                                {id:0,name:'inProgress'},
                                {id:1,name:'overdue'},
                                {id:2,name:'achieved'}
                            ]}
                        />
                    </div>
                </div>
                {isMobOrTab && <ToggleBtn 
                    titles={['Cancel','Add A New Goal']}
                    classNames={[
                        'bg-black rounded-lg text-white float-end', 
                        'bg-red-600'
                    ]}
                    state={openForm.status}
                    handler={handleOpenForm}
                    Icon={PlusIcon}
                    size={'size-10'}
                />}
            </div>
        </div>
    )
}

export default GoalProgressApp;