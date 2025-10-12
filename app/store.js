import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from '/src/features/TodoSlice/TodoSlice'
import GoalReducer from '/src/features/GoalSlice/GoalSlice';
import pomodoroReducer from '/src/features/PomodoroSlice/pomodoroSlice'



export const store = configureStore({
    reducer:{
        todo: TodoReducer,
        goals: GoalReducer,
        pomodoro: pomodoroReducer,
    }
})