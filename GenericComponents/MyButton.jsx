import React from 'react'
import { twMerge } from 'tailwind-merge'

const MyButton = ({text, onClick, className, type}) => {
    return (
        <button 
            type={type}
            className={twMerge(
                'text-white bg-black w-full h-10 rounded-lg hover:bg-stone-700 ',
                className
            )}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default MyButton
