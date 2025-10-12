import React from 'react';
import FormModal from '../../../GenericComponents/FormModal';
import AddNewForm from '../../../GenericComponents/AddNewForm';
import { useDispatch, useSelector } from 'react-redux';
import { goalsActions } from '../../../features/GoalSlice/GoalSlice';
import NumInput from '../../../GenericComponents/NumInput';

const AddNewGoal = () => {
    const { form, openForm } = useSelector(state => state.goals);
    const dispatch = useDispatch();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const actionType = openForm.title.split(' ')[0];

    const action = (value, name) => {
        dispatch(goalsActions.setForm({[name]:value}));
    }

    function handleChange(e){
        const {name, value} = e.target;
        action(value, name);
    }

    function handleNewGaol(){
        dispatch(goalsActions.setOpenForm({
            status:false, 
            title:'Add A New Goal'
        }));

        if(actionType === 'Edit'){
            dispatch(goalsActions.editGoal(openForm.id));
            return;
        }
        dispatch(goalsActions.addGoal());
    }


    return (
        <FormModal styles={'bg-green-100 grow'}>
            <p className='font-medium text-xl text-center mb-3'>
                {openForm.title}
            </p>
            <AddNewForm
                name='name' 
                value={form.name}
                onChange={handleChange}
                handleNew={handleNewGaol}
                holder='Goal'
                text={actionType+' Goal'}
                className='space-y-2 mb-1'
            >
                <NumInput 
                    width='w-15'
                    name='totalSteps' 
                    value={form.totalSteps}
                    action={action}
                    label='Total Steps'
                    min={1} max={9999}
                />
                <NumInput 
                    width='w-15'
                    name='completedSteps'
                    value={form.completedSteps}
                    action={action}
                    label='Completed Steps'
                    min={0} max={form.totalSteps}
                />
                <label className='block text-center font-semibold'>
                    Deadline : 
                </label>
                <input
                    name='deadline'
                    value={form.deadline}
                    onChange={handleChange}
                    className='w-full '
                    type='date'
                    min={minDate}
                    required
                />
                <label className=' font-semibold'>
                    Notes:
                </label>
                <textarea 
                    name='notes'
                    value={form.notes}
                    onChange={handleChange}
                    className={`
                        bg-white border-gray-300 
                        resize-none w-full h-20 
                        py-1 px-2 border
                    `}
                ></textarea>
            </AddNewForm>
        </FormModal>
    )
}

export default AddNewGoal;