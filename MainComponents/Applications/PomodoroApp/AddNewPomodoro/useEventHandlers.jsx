import { useDispatch, useSelector } from "react-redux";
import { pomodoroActions } from "../../../../features/PomodoroSlice/pomodoroSlice";
import { getDuration, getItem } from "../../../../features/helperFunctions";


export default function useEventHandlers () {
    const { openForm, form } = useSelector(state => state.pomodoro);
    const { todoList } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const filterTodos = todoList.filter(todo=>todo.status ==='todo');
    const actionType = openForm.title.split(' ')[0]

    function handleNameChange(e){
        dispatch(pomodoroActions.setForm({name:e.target.value}))
    }

    function handleNewGaol(){
        const isTimerValid = ['Focus', 'Break'].some(session =>(
            getDuration(form.sessions[session].duration) === 0
        ));

        if(isTimerValid) {
            alert('Please Set A valid Duration For Each Session');
            return;
        };

        let totalDuration = 0;
        ['Focus','Break'].forEach(session=>{
            totalDuration += (
                getDuration(form.sessions[session].duration) *
                form.sessions[session].numOfSessions.length
            );
        });
        
        if(!form.relatedTodo.doesRelate) {
            dispatch(pomodoroActions.setRelatedTodo(null));
        };
        dispatch(pomodoroActions.setForm({totalDuration}));
        dispatch(pomodoroActions.setOpenForm({
            status:false, 
            title:'Add A New Pomodoro'
        }));

        if(actionType === 'Edit'){
            dispatch(pomodoroActions.editPomodoro(openForm.id));
            return;
        }

        dispatch(pomodoroActions.addPomodoro());
    }

    function handleRelatedChange(e){
        console.log(e.target.value);
        const index = getItem('name', e.target.value, filterTodos);
        dispatch(pomodoroActions.setRelatedTodo(filterTodos[index]));
    }

    function handleRadioChange(){
        dispatch(pomodoroActions.setRelated());
        dispatch(pomodoroActions.setRelatedTodo(filterTodos[0]));
    }

    const action = (value) => {
        dispatch(pomodoroActions.setNumOfSessions(value));
    }

    return {
        action, handleNameChange, handleNewGaol, 
        handleRadioChange, handleRelatedChange,
        filterTodos, actionType
    };
}
