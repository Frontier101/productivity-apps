import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { goalsActions } from '../features/GoalSlice/GoalSlice';
import SortedList from '../GenericComponents/SortedList';
import Goal from '../MainComponents/Applications/GoalProgressApp/Goal';
import { DeadlinePeriod, getSorts } from '../features/GoalSlice/GoalHelpers';

export default function useGoal () {
    const { goalsList, openForm } = useSelector(state => state.goals);
    const dispatch = useDispatch();

    const sortedList = getSorts(goalsList);

    function handleOpenForm(){
        dispatch(goalsActions.setOpenForm({
            status:!openForm.status, 
            title:'Add A New Goal'
        }));
        dispatch(goalsActions.resetForm());
    }

    function handleSort(e){
        dispatch(goalsActions.setSort(e.target.value))
    }

    const listMap = new Map([
        [
            'inProgress' , 
            <SortedList 
                list={sortedList}
                Item={Goal}
                mapProps={(goal)=>({goal})}
            />
        ],
        [
            'overdue' , 
            goalsList.filter((goal)=>(
                DeadlinePeriod(goal.deadline) === 'overdue' &&
                goal.totalSteps > goal.completedSteps
            )).map(goal=>(
                <Goal key={goal.id} goal={goal}/>
            ))
        ],
        [
            'achieved' , 
            goalsList.filter((goal)=>(
                goal.totalSteps === goal.completedSteps
            )).map(goal=>(
                <Goal key={goal.id} goal={goal}/>
            ))
        ],
    ])

    return {handleOpenForm, handleSort, listMap};
}
