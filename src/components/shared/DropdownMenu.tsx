import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/button'
import ArrowRightIcon from '../icon/ArrowRightIcon'
import { cn } from '@/lib/utils'

const DropdownMenu = ({ menuItem, path, openItem }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="">
            <div onClick={() => setIsOpen((prev) => !prev)} className={cn("flex justify-between p-2 text-white bg-gray-500 cursor-pointer")}>
                {openItem && menuItem?.title}
                <ArrowRightIcon className={`duration-300 ${isOpen ? "rotate-90 " : "rotate-0"}`} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: "0px" }} animate={{ height: "auto" }} exit={{ height: "0px" }} transition={{ duration: .5 }} className="overflow-hidden">

                        {/* loop the menu item */}
                        {menuItem?.subMenuItem?.map((item: any, index: any) => (
                            <Link href={item.link} key={index} className="relative block w-full p-3 text-sm font-normal text-white">
                                <div className="flex">
                                    <div className="relative flex gap-3">
                                        <span>{item.icon}</span>
                                        <div className={`${!open && "hidden"} duration-300`}>{item.title}</div>
                                    </div>
                                </div>
                                {path === item.link && (
                                    <motion.div

                                        layoutId="active-pill"
                                        className={cn("absolute inset-0 bg-blue-500 -z-50")} />
                                )}
                            </Link>
                        ))}
                    </motion.div>)}
            </AnimatePresence>
        </div>
    )
}

export default DropdownMenu