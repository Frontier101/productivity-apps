import React from 'react'
import { twMerge } from 'tailwind-merge'
import { FLEX_CTR } from '../ClassNames'

const OptionBtn = ({text, onClick, Icon, className}) => {
    return (
        <button 
            onClick={onClick} 
            className={twMerge('gap-2 rounded-lg', FLEX_CTR, className)}
        >
            <Icon className='size-6' />
            <p>{text}</p>
        </button>
    )
}

export default OptionBtn
