import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'

const Popup = ({Icon, className, children}) => {
    const [open, setOpen] = useState(false);
    return (
        <div onClick={()=>setOpen(!open)} className={className[0]}>
            <Icon className={className[1]}/>
            <AnimatePresence>
                {open && children}
            </AnimatePresence>
        </div>
    )
}

export default Popup
