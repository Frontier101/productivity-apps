import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pomodoroActions } from "../features/PomodoroSlice/pomodoroSlice";
import { getDuration, getItem } from "../features/helperFunctions";
import { todoActions } from "../features/TodoSlice/TodoSlice";
import { goalsActions } from "../features/GoalSlice/GoalSlice";


export default function useTimer(pomodoro){
    const { todoList } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const duration = pomodoro.sessions[pomodoro.currentSession].duration;
    const breakSessions = pomodoro.sessions['Break'].numOfSessions.at(-1);

    const index = getItem('id',pomodoro.relatedTodo.todo?.id,todoList );

    const hasFinished = (
        breakSessions === 1 && 
        pomodoro.isPlay && 
        todoList[index]?.status === 'todo'
    );

    useEffect(()=>{
        if(hasFinished){
            dispatch(todoActions.checkTodo(pomodoro.relatedTodo.todo.name));
            dispatch(goalsActions.updateProgress(pomodoro.relatedTodo.todo));
        }
    },[breakSessions]);
    
    useEffect(()=>{
        let timer;
        let interval;
        if(pomodoro.isPlay && breakSessions === 0){
            interval = setInterval(()=>{
                dispatch(pomodoroActions.countdown(pomodoro.id));
            },1000);
            timer = setTimeout(()=>{
                clearInterval(interval);
            },getDuration(duration));
        }
        if(breakSessions === 1){
            dispatch(pomodoroActions.pauseTimer(pomodoro.id));
        }
        return ()=>{
            clearInterval(interval);
            clearTimeout(timer);
        };
    },[pomodoro.isPlay, pomodoro.seconds]);

}