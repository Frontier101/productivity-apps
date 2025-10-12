import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MinusCircleIcon from '@heroicons/react/20/solid/MinusCircleIcon';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import { todoActions } from '../../../features/TodoSlice/TodoSlice';
import { FLEX_BTW } from '../../../ClassNames';
import ConfirmPopup from './ConfirmPopup';
import ToggleBtn from '../../../GenericComponents/ToggleBtn';
import AddNewCategory from './AddNewCategory';
import PlusIcon from '@heroicons/react/20/solid/PlusIcon';



const Categories = () => {
    // states
    const [addCategory, setAddCategory] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Global state
    const { categories } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    // event handlers
    function handleAddCategory(){
        setAddCategory(!addCategory);
    }

    function handleShowConfirm(){
        if(categories.length){
            setShowConfirm(true)
        }
    }

    function handleConfirm(){
        dispatch(todoActions.clearCategories());
        setShowConfirm(false);
    }

    return (
        <div className="space-y-2 bg-stone-300 p-2 w-full relative ">
            {(showConfirm) && 
                <ConfirmPopup 
                    onCancel={()=>setShowConfirm(false)} 
                    onConfirm={handleConfirm}
                />
            }
            <div className={FLEX_BTW}>
                <ToggleBtn 
                    titles={["Cancel", "Add A New Category"]}
                    classNames={[
                        "size-6 rounded-full bg-white",
                        "bg-red-400"
                    ]}
                    state={addCategory}
                    handler={handleAddCategory}
                    Icon={PlusIcon}
                    size={"size-4"}
                />
                <button
                    type='button'
                    title="Clear All Categories"
                    onClick={handleShowConfirm}
                >
                    <TrashIcon 
                        className="text-red-600 size-5"
                    />
                </button>
            </div>
            {addCategory && <AddNewCategory /> }
            <ul className=' bg-white list-none px-2 py-1 h-35 overflow-auto'>{
                categories.map(category => (
                    <li key={category.id} className={FLEX_BTW}>
                        <p className='capitalize'>{category.name}</p>
                        <button
                            title='Remove This Category'
                            onClick={()=> (
                                dispatch(todoActions.deleteCategory(category.id))
                            )}
                        >
                            <MinusCircleIcon className='size-4 text-yellow-400' />
                        </button>
                    </li>
                ))
            }</ul>
        </div>
    )
}

export default Categories;