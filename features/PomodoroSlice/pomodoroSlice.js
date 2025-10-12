import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, getItem, setId, storage } from "../helperFunctions";
import { countdown, pauseTimer, reducer, resetTimer, setIsPlay } from "./pomodoroHelpers";

const pomodoroStorage = storage('pomodoro');

const defaultForm = {
    name:'',
    isPlay:false,
    seconds:0,
    counter:0,
    currentSession:'Focus',
    sessions:{
        'Focus':{duration:{h:0,min:0,sec:1},numOfSessions:[0]},
        'Break':{duration:{h:0,min:0,sec:1},numOfSessions:[0]},
    },
    totalDuration:0,
    relatedTodo:{doesRelate:false, todo:null},
    realTime:'',
}

const pomodoroSlice = createSlice({
    name:'pomodoro',
    initialState:{
        pomodoroList:pomodoroStorage(),
        openForm:{
            id:0,
            status:false, 
            title:'Add A Pomodoro'
        },
        form:{...defaultForm},
        fullSize: {status:false, id:0},
    },
    reducers:{
        setOpenForm:(state, action)=>{
            Object.assign(state.openForm, action.payload);
        },
        addPomodoro:(state) =>{
            const id = setId(state.pomodoroList);
            state.pomodoroList.unshift({id, ...state.form});
            state.form = {...defaultForm};
            pomodoroStorage(state.pomodoroList);
        },
        deletePomodoro:(state, action)=>{
            deleteItem(
                state.pomodoroList,
                action.payload,
                pomodoroStorage
            );
        },
        editPomodoro:(state, action)=>{
            const index = getItem(
                'id',
                action.payload, 
                state.pomodoroList
            );
            Object.assign(state.pomodoroList[index], state.form);
            state.form = {...defaultForm}
            pomodoroStorage(state.pomodoroList);
        },
        setIsPlay:(state, action)=>{
            reducer(state, action, setIsPlay);
        },
        pauseTimer:(state, action)=>{
            reducer(state, action, pauseTimer);
        },
        countdown:(state, action)=>{
            reducer(state, action, countdown);
        },
        resetTimer:(state, action)=>{
            reducer(state, action, resetTimer);
        },
        setFullSize:(state, action)=>{
            Object.assign(state.fullSize, action.payload);
        },
        setRealTime:(state, action)=>{
            const index = getItem(
                'id',
                action.payload.id,
                state.pomodoroList
            );
            const pomodoro = state.pomodoroList[index];
            pomodoro.realTime = action.payload.time;
        },
        setForm:(state,action)=>{
            Object.assign(state.form, action.payload);
        },
        setDuration:(state, action)=>{
            Object.assign(
                state.form.sessions[action.payload.label].duration, 
                action.payload.duration
            );
        },
        setNumOfSessions:(state, action)=>{
            ['Focus','Break'].forEach(session=>{
                state.form.sessions[session].numOfSessions = (
                    new Array(action.payload).fill(0)
                );
            })
        },
        setRelatedTodo:(state, action)=>{
            state.form.relatedTodo.todo = action.payload
        },
        setRelated:(state)=>{
            state.form.relatedTodo.doesRelate = !(
                state.form.relatedTodo.doesRelate
            );
        }
    }
});

export default pomodoroSlice.reducer;
export const pomodoroActions = pomodoroSlice.actions;