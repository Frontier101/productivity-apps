import React from 'react'


const Input = ({value, name, onChange, holder, required}) => {
    return (
        <>
            <input
                name={name}
                value={value}
                onChange={onChange}
                type="text"
                maxLength={18}
                className={
                    `w-full h-10 rounded p-2
                    border border-gray-300 bg-white`
                }
                placeholder={holder+' Name'}
                required={required}
                
            />
        </>
    )
}

export default Input
