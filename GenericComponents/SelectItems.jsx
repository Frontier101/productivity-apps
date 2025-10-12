import React, { useId } from 'react'
import { twMerge } from 'tailwind-merge';

const SelectItems = ({label, value, onChange, items, defaultItem, className=''}) => {
    const id = useId();

    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={twMerge(
                    " grow h-8 border bg-white rounded-sm capitalize px-1 ",
                    className
                )}
            >
                {defaultItem && <option value=''>{defaultItem}</option>}
                {items.map(item=>(
                    <option 
                        key={item.name+item.id} 
                        option={item.name}
                    >
                        {item.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export default SelectItems;
