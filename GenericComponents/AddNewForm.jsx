import React from 'react';
import Input from './Input';
import MyButton from './MyButton';

const AddNewForm = ({handleNew, holder, name, value, onChange, text, className, children}) => {
    return (
        <form className="w-full " onSubmit={e => {
            e.preventDefault();
            handleNew();
        }}>
            <div className={className}>
                <Input 
                    name={name}
                    value={value} 
                    onChange={onChange}
                    holder={holder}
                    required={true}
                />
                {children}    
            </div>
            <MyButton type='submit' text={text}/>
        </form>
    )
}

export default AddNewForm
