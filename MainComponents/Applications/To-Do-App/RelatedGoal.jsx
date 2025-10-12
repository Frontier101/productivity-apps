import React from 'react'
import SelectItems from '../../../GenericComponents/SelectItems';
import { FLEX_BTW } from '../../../ClassNames';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../../../features/TodoSlice/TodoSlice';
import { twMerge } from 'tailwind-merge';
import { DeadlinePeriod } from '../../../features/GoalSlice/GoalHelpers';

const RelatedGoal = () => {
    const dispatch = useDispatch();
    const { goal } = useSelector(state => state.todo);
    const { goalsList } = useSelector(state => state.goals);

    return (
        <div className='space-y-2 h-35 mb-4 '>
            <fieldset className='border p-2'>
                <legend className='text-center w-35'>
                    Does This Task Relate To A Goal?
                </legend>
                
                <div className={twMerge(
                    ' gap-4 flex-wrap p-1',
                    FLEX_BTW
                )}>
                    <Radio label='no' />
                    <Radio label='yes' labelClass=' peer' />
                    <SelectItems
                        value={goal}
                        onChange={e => 
                            dispatch(todoActions.setGoal(e.target.value))
                        }
                        items={goalsList.filter(goal => 
                            DeadlinePeriod(goal.deadline) !== 'overdue' &&
                            goal.totalSteps > goal.completedSteps
                        )}
                        className=' hidden peer-has-checked:block basis-full'
                    />
                </div>
            </fieldset>
            
        </div>
    )
}

export default RelatedGoal;

function Radio({label, labelClass=''}){
    const dispatch = useDispatch();
    const { relatedToGoal} = useSelector(state => state.todo);
    return (
        <label className={twMerge(
            'capitalize cursor-pointer',
            labelClass
        )}>
            <input
                value={label}
                onChange={() => dispatch(todoActions.setRelatedToGoal())}
                type='radio'  
                className='me-2 '
                name='goals'
                checked={relatedToGoal === label}
            />
            {label}
        </label>
    )
}
