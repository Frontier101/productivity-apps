import React, { useState } from 'react'
import Input from '../../../GenericComponents/Input'
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../../../GenericComponents/MyButton';
import { todoActions } from '../../../features/TodoSlice/TodoSlice';

const AddNewCategory = () => {
    const [newCategory, setNewCategory] = useState('');
    
    const { categories } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    function handleNewCategory(){
        if(!newCategory) return
        if(categories.some(
            category => (
                category.name.toLowerCase() 
                == newCategory.toLowerCase()
            )
        )){
            alert('Category already exists');
            return;
        }
        dispatch(todoActions.addToCategories(newCategory));
        setNewCategory('');
        dispatch(todoActions.setCurrentCategory(newCategory));
    }

    return (
        <div className='space-y-2'>
            <Input 
                value={newCategory} 
                onChange={e=>setNewCategory(e.target.value)}
                holder={'Category'}
            />
            <MyButton 
                type='button' 
                text='Add Category' 
                onClick={handleNewCategory}
            />
        </div>
    )
}

export default AddNewCategory
