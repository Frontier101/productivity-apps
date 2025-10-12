import React from 'react'
import { AnimatePresence } from 'framer-motion'

const SortedList = ({list, Item, mapProps}) => {
    return (
        <>{Object.keys(list).map(sort =>(
            list[sort].length > 0 && 
            <fieldset
                key={sort} 
                className='border-t-2 py-2 px-3 space-y-3'
            >
                <legend className='capitalize px-2'>
                    {sort === "" ? 'General' : sort}
                </legend>
                <AnimatePresence>
                {list[sort].map(item => (
                    <Item
                        key={item.id} 
                        {...mapProps(item)}
                    />
                ))}
                </AnimatePresence>
            </fieldset>
        ))}</>
    )
}

export default SortedList
