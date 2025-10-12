import React from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../../features/TodoSlice/TodoSlice';
import { goalsActions } from '../../../features/GoalSlice/GoalSlice';
import { twMerge } from 'tailwind-merge';
import AnimatedItem from '../../../GenericComponents/AnimatedItem';
import { FLEX_BTW, PRIORITIES } from '../../../ClassNames';
import Lottie from 'react-lottie-player';
import checkmark from '/src/assets/checkmark.json';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';


const ToDo = ({todo, onClick}) => {
    const dispatch = useDispatch();

    function handleChecked(){
        dispatch(todoActions.changeChecked(todo.id));
        dispatch(goalsActions.updateProgress(todo));
    }

    return (
        <AnimatedItem className={twMerge(
            `px-3 py-2 hover:bg-[rgba(255,255,255,.3)]`, 
            FLEX_BTW
        )}>
            <div className={twMerge(' p-2', FLEX_BTW)}>
                <label className={twMerge(
                    `peer relative me-4 size-8 
                    rounded-full border-2
                    overflow-hidden cursor-pointer `,
                    Object.keys(PRIORITIES).find(
                        key => PRIORITIES[key] === todo.priority
                    )
                )}>
                    <input
                        id={todo.id}
                        value={todo.status}
                        onChange={handleChecked}
                        className=' appearance-none absolute top-0'
                        type='checkbox'
                        checked={todo.status === 'done'}
                    />
                    {todo.status === 'done' && <Lottie
                        loop={false}
                        animationData={checkmark}
                        play
                        className={`
                            size-12 absolute 
                            -top-[.65rem] -left-[.6rem]
                        `}
                    />}
                </label>
                <label
                    htmlFor={todo.id}
                    className={`
                        text-center 
                        peer-has-checked:line-through 
                        peer-has-checked:text-gray-500
                    `}
                >
                    {todo.name}
                </label>
            </div>
            <button
                type='button' 
                onClick={onClick}
                className={`
                    size-8 text-red-500 -translate-y-1 
                    rounded hover:bg-white
                `}
            >
                <XMarkIcon />
            </button>
        </AnimatedItem>
    )
}

export default ToDo