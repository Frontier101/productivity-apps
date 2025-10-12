import React from 'react'
import { twMerge } from 'tailwind-merge'

const Indicator = ({className}) => {
    return (
        <div className={twMerge(
            'size-2 border rounded-full', 
            className
        )}>
        </div>
    )
}

export default Indicator;;