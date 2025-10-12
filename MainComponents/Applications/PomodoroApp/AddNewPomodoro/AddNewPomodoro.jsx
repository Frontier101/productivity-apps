import React from 'react'
import { useSelector } from 'react-redux'
import FormModal from '../../../../GenericComponents/FormModal'
import AddNewForm from '../../../../GenericComponents/AddNewForm';
import Related from '../../../../GenericComponents/Related';
import NumInput from '../../../../GenericComponents/NumInput';
import SessionDuration from './SessionDuration';
import useEventHandlers from './useEventHandlers';

const AddNewPomodoro = () => {
    const { openForm, form } = useSelector(state => state.pomodoro);
    
    const handler = useEventHandlers();

    return (
        <FormModal styles={'bg-indigo-100 z-1000 grow'}>
        <p className='font-medium text-xl text-center mb-3'>
            {openForm.title}
        </p>
            <AddNewForm
                name='name' 
                value={form.name}
                onChange={handler.handleNameChange}
                handleNew={handler.handleNewGaol}
                holder='Pomodoro'
                text={handler.actionType+' Pomodoro'}
                className='space-y-3 divide-y'
            >
                <NumInput 
                    width='w-10'
                    label='Number Of Sessions '
                    value={form.sessions['Focus'].numOfSessions.length} 
                    action={handler.action} 
                    min={1} 
                    max={7}
                />
                <SessionDuration label='Focus'/>
                <SessionDuration label='Break'/>
                <Related 
                    legend='Does it complete A Todo Task?'
                    onChange={handler.handleRelatedChange}
                    items={handler.filterTodos}
                    value={form.relatedTodo.todo}
                    doesRelate={form.relatedTodo.doesRelate}
                    onRadioChange={handler.handleRadioChange}
                />
            </AddNewForm>
        </FormModal>
    )
}

export default AddNewPomodoro;