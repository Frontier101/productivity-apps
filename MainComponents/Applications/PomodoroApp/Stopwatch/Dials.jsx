import React from 'react'
import { twMerge } from 'tailwind-merge'

const Dials = ({rotate}) => {
    return (
        <div className={twMerge('size-full z-2 rounded-full absolute',rotate)}>
            <Dial position='top-0 right-1/2 translate-x-1/2'/>
            <Dial position='top-1/15 right-1/4 -translate-y-2/10 translate-x-1/6 rotate-30'/>
            <Dial position='top-1/4 right-1/14 -translate-y-2/10 translate-x-1/6 rotate-60'/>
            <Dial position='top-1/2 right-0 -translate-1/2 rotate-90'/>
            <Dial position='bottom-1/4 right-1/14 translate-y-2/10 -translate-x-1/6 -rotate-60'/>
            <Dial position='bottom-1/14 right-1/4 translate-y-2/10 -translate-x-1/6 -rotate-30'/>
            <Dial position='bottom-0 right-1/2 translate-x-1/2'/>
        </div>
    )
}

export default Dials;

function Dial({position}){
    return(
        <div className={twMerge(
            'absolute border origin-center-bottom w-0 h-1/30',
            position
        )}/>
    )
}