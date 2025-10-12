import React from 'react'
import AddNewToDo from './AddNewToDo'
import { FLEX_BTW, FLEX_CTR, LIST_BG } from '../../../ClassNames'
import { AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { useDispatch, useSelector } from 'react-redux'
import TodoClass from '../../../features/TodoSlice/TodoClass'
import { todoActions } from '../../../features/TodoSlice/TodoSlice'
import SortedList from '../../../GenericComponents/SortedList'
import ToDo from './ToDo'
import SelectItems from '../../../GenericComponents/SelectItems'
import ToggleBtn from '../../../GenericComponents/ToggleBtn'
import PlusIcon from '@heroicons/react/20/solid/PlusIcon'

const ToDoApp = ({isMobOrTab}) => {
    const { todoList, sort, sortingList, openForm } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const sortedList = TodoClass.sortBy(todoList, sort, sortingList[sort]);

    function handleDelete(id){
        dispatch(todoActions.deleteTodo(id));
    }

    function handleOpenForm(){
        dispatch(todoActions.setOpenForm());
    }
    

    return (
        <div className={twMerge(
            `relative flex-col lg:flex-row 
            gap-1 h-9/10 p-3 font-[cursive]`,
            FLEX_BTW
        )}>
            <form 
                onSubmit={e=>e.preventDefault()} 
                className={twMerge('lg:w-8/10',LIST_BG)}
            >
                <SortedList
                    list={sortedList} 
                    Item={ToDo}
                    mapProps={(todo)=>({
                        todo,
                        onClick:()=>handleDelete(todo.id)
                    })}
                />
            </form>
            <div className='w-full md:w-3/10 '>
                <AnimatePresence>
                    {(openForm || !isMobOrTab) && 
                        <AddNewToDo isMobOrTab={isMobOrTab}/>
                    }
                </AnimatePresence>
                <div className={twMerge('w-full gap-3',FLEX_BTW)}>
                    <div className={twMerge('gap-3 lg:mb-3 grow',FLEX_CTR)}>
                        <SelectItems
                            label='Sort by:'
                            value={sort}
                            onChange={e =>(
                                dispatch(todoActions.setSort(e.target.value)
                            ))}
                            items={sorts()}
                        />
                    </div>
                    {isMobOrTab && <ToggleBtn 
                        titles={['Cancel','Add A To-Do']}
                        classNames={[
                            'bg-amber-500 rounded-full text-white float-end', 
                            'bg-red-600'
                        ]}
                        state={openForm}
                        handler={handleOpenForm}
                        Icon={PlusIcon}
                        size={'size-10'}
                    />}
                </div>
            </div>
        </div>
    )
}

export default ToDoApp;

function sorts(){
    const sortNames = [
        'category','time',
        'goal','priority','status'
    ];
    return sortNames.map((name, i)=>(
        { id:i, name}
    ))
}