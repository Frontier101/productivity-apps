import { createSlice } from "@reduxjs/toolkit";
import * as helpers from "./TodoHelpers";
import TodoClass from "./TodoClass";
import { setId, storage, deleteItem, getItem } from "../helperFunctions";

const categoryStorage = storage('categories');

const ToDoSlice = createSlice({
    name:'todo',
    initialState:{
        todoList:helpers.todosStorage(),
        currentCategory:'',
        categories:categoryStorage(),
        sort:'category',
        sortingList:helpers.getSorts(),
        priority:'No Priority',
        relatedToGoal:'no',
        goal:'',
        openForm: false,
    },
    reducers:{
        setOpenForm:(state, action)=>{
            if(action.payload === false){
                state.openForm = false;
                return;
            }
            state.openForm = !state.openForm;
        },
        addTodo:(state, action)=>{
            const name = action.payload.name;
            const category = (
                action.payload
                .category.toLowerCase()
            );
            const date = new Date().toISOString();
            const id = setId(state.todoList)
            const goal = (
                state.relatedToGoal==='yes' 
                ? state.goal : null
            );

            const newTodo = new TodoClass(
                id, name, date, goal,
                category, state.priority
            );
            
            state.todoList.unshift({...newTodo});
            helpers.todosStorage(state.todoList);
            state.sortingList = helpers.getSorts();
        },
        deleteTodo:(state, action)=>{
            deleteItem(
                state.todoList,
                action.payload,
                helpers.todosStorage
            );
        },
        changeChecked:(state, action)=>{
            const index = getItem(
                'id',
                action.payload,
                state.todoList
            )
            const status = state.todoList[index].status;
            state.todoList[index].status = (
                status === 'todo' ? 'done' : 'todo'
            );
            helpers.todosStorage(state.todoList);
        },
        checkTodo:(state, action)=>{
            const index = getItem(
                'name',
                action.payload,
                state.todoList
            );
            if(index < 0) return;
            state.todoList[index].status = 'done';
            helpers.todosStorage(state.todoList);

        },
        setCurrentCategory:(state, action)=>{
            state.currentCategory = action.payload;
        },
        addToCategories:(state, action)=>{
            if(!action.payload) return;
            const newCategory= {
                id:(
                    state.categories.length 
                    ? state.categories.at(-1).id + 1 
                    : 0
                ),
                name:action.payload,
            }
            state.categories.push(newCategory);
            categoryStorage(state.categories);
        },
        deleteCategory:(state, action)=>{
            deleteItem(
                state.categories,
                action.payload,
                categoryStorage
            )
        },
        clearCategories:(state)=>{
            state.categories.splice(0);
            categoryStorage(state.categories);
        },
        setSort:(state, action)=>{
            state.sort = action.payload.toLowerCase();
        },
        setPriority:(state, action)=>{
            state.priority = action.payload;
        },
        setRelatedToGoal:(state)=>{
            state.relatedToGoal = (
                state.relatedToGoal === 'no'
                ? 'yes' : 'no'
            );
        },
        setGoal:(state, action)=>{
            state.goal = action.payload;
        }
    }
});

export default ToDoSlice.reducer;
export const todoActions = ToDoSlice.actions;