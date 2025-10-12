import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../features/TodoSlice/TodoSlice';

export default function useNewTodo (isMobOrTab, goalsList) {
    // states
    const [todoName, setTodoName] = useState('');

    // global state
    const { categories, currentCategory } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(categories.length === 0){
            dispatch(todoActions.addToCategories(""))
        }
    },[categories])

    // event handlers
    function handleNewName(e){
        setTodoName(e.target.value)
    }

    function handleNewTodo(){
        dispatch(todoActions.addTodo({
            name : todoName, 
            category: currentCategory,
        }));
        setTodoName('');
        dispatch(todoActions.setPriority('No Priority'))
        dispatch(todoActions.setRelatedToGoal());
        if(isMobOrTab) dispatch(todoActions.setOpenForm());
    }

    function handleCurrentCategory(e){
        dispatch(todoActions.setCurrentCategory(e.target.value))
    }

    function handleRelateChange(e){
        dispatch(todoActions.setGoal(e.target.value));              
    }

    function handleRadioChange(){
        dispatch(todoActions.setRelatedToGoal());
        dispatch(todoActions.setGoal(goalsList[0].name));
    }

    return {
        todoName, handleNewName, 
        handleRelateChange,handleNewTodo, 
        handleCurrentCategory, handleRadioChange
    }
}
