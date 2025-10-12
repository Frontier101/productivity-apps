import React from 'react';
import UserCircleICon from '@heroicons/react/16/solid/UserCircleIcon';
import { BACKGROUND, BORDER, FLEX_BTW } from '../ClassNames';
import { twMerge } from 'tailwind-merge';


const Header = () => {
    
    return (
        <header 
            className={twMerge( 
                `sticky top-0 z-1 h-[3.7rem] 
                text-white overflow-hidden` ,
                FLEX_BTW , BORDER.b , BACKGROUND 
            )}
        >
            <h2>Productivity Apps</h2>
        </header>
    )
}

export default Header;