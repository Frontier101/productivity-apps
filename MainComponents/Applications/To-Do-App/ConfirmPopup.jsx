import React from 'react'
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { FLEX_CTR } from '../../../ClassNames';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const ConfirmPopup = ({onConfirm, onCancel}) => {
    return (
        <div className={twMerge(
            ' size-full z-2 inset-0 absolute bg-[rgba(0,0,0,0.3)]',
            FLEX_CTR
        )}>
            <AnimatePresence>
                <motion.div 
                    initial={{opacity:0, y:-10}}
                    animate={{opacity:1, y:0}}
                    exit={{opacity:0, x:-60}}
                    className={twMerge(
                        ' flex-col gap-3 w-7/10 h-20 text-white bg-black rounded-sm p-2', 
                        FLEX_CTR
                    )}
                >
                    <p>Do you Confirm?</p>
                    <div className="w-full flex justify-around">
                        <ConfirmBtn 
                            Icon={XMarkIcon} 
                            textColor='text-red-500' 
                            onClick={onCancel}
                        />
                        <ConfirmBtn 
                            Icon={CheckIcon} 
                            textColor='text-green-500' 
                            onClick={onConfirm}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
            
        </div>
    )
}

export default ConfirmPopup;

function ConfirmBtn({Icon ,textColor, onClick}){
    return (
        <button onClick={onClick}>
            <Icon 
                className={twMerge("size-5 border rounded-full ", textColor)} 
            />
        </button>
    )
}
