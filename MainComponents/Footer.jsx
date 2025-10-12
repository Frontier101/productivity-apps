import React from 'react'
import { twMerge } from 'tailwind-merge'
import { FLEX_BTW } from '../ClassNames'

const Footer = () => {
    return (
        <div className={twMerge(
            'w-full text-white h-[3.3rem] content-center px-4 lg:px-10',
            FLEX_BTW)
        }>
            <p>&copy; All rights Reserved</p>
            <p>Created By 
                <a 
                    target='_blank' 
                    rel='noopener noreferrer'
                    href='https://github.com/Frontier101'
                    className='px-1 hover:underline'
                >
                    Frontier101
                </a>
            </p>
        </div>
    )
}

export default Footer
