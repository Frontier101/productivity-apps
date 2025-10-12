import React from 'react'
import FlagIcon from '@heroicons/react/16/solid/FlagIcon'
import { FLEX_BTW, PRIORITIES } from '../../../ClassNames'
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../../../features/TodoSlice/TodoSlice';
import { twMerge } from 'tailwind-merge';

const Priority = () => {
    const { priority } = useSelector(state => state.todo); 
    const dispatch = useDispatch();

    function handleChange(key){
        dispatch(todoActions.setPriority(PRIORITIES[key]))
    }

    return (
        <div className='flex gap-4 p-1'>
            <p>Priority :</p>
            <div className={twMerge(' grow ',FLEX_BTW)}>{
                Object.keys(PRIORITIES).map(key => (
                    <label key={key}>
                        <input
                            className='peer hidden'
                            checked={
                                priority === PRIORITIES[key] 
                                ? true : false
                            }
                            onChange={()=>handleChange(key)}
                            type='radio' 
                            name={priority}
                        />
                        <FlagIcon
                            title={PRIORITIES[key]}
                            className={twMerge(
                                `h-7 p-1 rounded-full 
                                cursor-pointer 
                                peer-checked:border`, key
                            )}
                        />
                    </label>
                ))
            }</div>
        </div>
    )
}

export default Priority;
