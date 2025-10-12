import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, getItem, setId, storage } from "../helperFunctions";

const defaultForm = {
    name:'',
    totalSteps:1,
    completedSteps:0,
    deadline:'',
    notes:'',
    tasks:[],
}

const goalStorage = storage('goals');


const GoalSlice = createSlice({
    name:'goals',
    initialState:{
        goalsList:goalStorage(),
        openForm:{
            id:0,
            status:false, 
            title:'Add A New Goal'
        },
        form:{...defaultForm},
        sort:'inProgress'
    },
    reducers:{
        addGoal:(state)=>{
            const id = setId(state.goalsList);
            state.goalsList.unshift({id, ...state.form});
            state.form = {...defaultForm}
            state.goalsList.sort((obj1, obj2)=>(
                new Date(obj2.deadline) - new Date(obj1.deadline)
            ))
            goalStorage(state.goalsList);
        },
        removeGoal:(state, action)=>{
            deleteItem(
                state.goalsList,
                action.payload,
                goalStorage
            );
        },
        updateProgress:(state, action)=>{
            const index = getItem(
                'name',
                action.payload.goal, 
                state.goalsList
            );
            console.log(action.payload);
            if(index < 0) return;
            const total = state.goalsList[index].totalSteps;
            const complete = state.goalsList[index].completedSteps;

            if(action.payload.status === 'todo'){
                if(total === complete){
                    state.goalsList[index].totalSteps++;
                }
                state.goalsList[index].completedSteps++;
                state.goalsList[index].tasks.push(action.payload)
            }else{
                if(complete === 0) return;
                state.goalsList[index].completedSteps--;
                const taskIndex = getItem(
                    'date',
                    action.payload.date,
                    state.goalsList[index].tasks
                )
                state.goalsList[index].tasks.splice(taskIndex,1)
            }
            goalStorage(state.goalsList);
        },
        editGoal:(state, action)=>{
            const index = getItem(
                'id',
                action.payload, 
                state.goalsList
            );
            Object.assign(state.goalsList[index], state.form);
            state.form = {...defaultForm}
            goalStorage(state.goalsList);
        },
        setOpenForm:(state, action)=>{
            Object.assign(state.openForm, action.payload);
        },
        setForm:(state, action)=>{
            Object.assign(state.form, action.payload);
        },
        resetForm:(state)=>{
            state.form = {... defaultForm};
        },
        setSort:(state, action)=>{
            state.sort = action.payload;
        }
    }
})

export default GoalSlice.reducer;
export const goalsActions = GoalSlice.actions;