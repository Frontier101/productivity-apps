import React, { useEffect, useState } from 'react'
import { FLEX_CTR } from '../ClassNames';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const ToggleBtn = ({titles, classNames, state, handler, Icon, size}) => {
    const [rotate, setRotate] = useState(45);

    useEffect(()=>{
        setRotate(rotate+45);
    }, [state])

    return (
        <button
            type='button'
            title={state ? titles[0] : titles[1]}
            className={twMerge(
                FLEX_CTR, classNames[0], state && classNames[1]
            )}
            onClick={handler}
        >
            <motion.span animate={{rotate}}>
                <Icon className={size} />
            </motion.span>
        </button>
    )
}

export default ToggleBtn;