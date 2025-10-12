import React from 'react'
import { FLEX_BTW } from '../ClassNames';
import { twMerge } from 'tailwind-merge';

const NumInput = ({label, name, min, max, value, action, width}) => {
    const forbiddenKeys = ['e', '.', ','];
    
    function handleChange(e){
        let { name ,value, max } = e.target;
        value = Number(value);
        if(value > max || value < min) return;

        action(value, name);
    }

    return(
        <label className={twMerge('gap-1 pb-2',FLEX_BTW)}>
            {label && <span className='font-semibold'>{label} : </span>}
            <input 
                className={twMerge('border border-gray-300 bg-white h-7 ps-2',width) }
                type="number"
                min={min}
                max={max}
                name={name}
                value={value}
                onChange={handleChange}
                onKeyDown={e=>{
                    if(forbiddenKeys.includes(e.key)){
                        e.preventDefault();
                    }
                }}
            />
            {!label && name}
        </label>
    )
}

export default NumInput
