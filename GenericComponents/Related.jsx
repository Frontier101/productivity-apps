import React from 'react'
import { twMerge } from 'tailwind-merge';
import { FLEX_BTW } from '../ClassNames';
import SelectItems from './SelectItems';

const Related = ({legend, onChange, items, value, onRadioChange, doesRelate}) => {

    return (
        <div className='space-y-2 h-35 mb-4 '>
            <fieldset className='border p-2'>
                <legend className='text-center w-35'>
                    {legend}
                </legend>
                
                <div className={twMerge(
                    'gap-4 flex-wrap p-1',
                    FLEX_BTW
                )}>
                    <Radio 
                        label='no' 
                        onRadioChange = {onRadioChange}
                        doesRelate={!doesRelate}
                    />
                    <Radio 
                        label='yes'
                        labelClass='peer' 
                        onRadioChange = {onRadioChange}
                        doesRelate={doesRelate}
                    />
                    <SelectItems
                        value={value}
                        onChange={onChange}
                        items={items}
                        className='hidden peer-has-checked:block basis-full'
                    />
                </div>
            </fieldset>
            
        </div>
    )
}

export default Related;

function Radio({onRadioChange, doesRelate, label, labelClass=''}){
    return (
        <label className={twMerge(
            'capitalize cursor-pointer',
            labelClass
        )}>
            <input
                value={label}
                onChange={onRadioChange}
                type='radio'  
                className='me-2 '
                name='goals'
                checked={doesRelate}
            />
            {label}
        </label>
    )
}