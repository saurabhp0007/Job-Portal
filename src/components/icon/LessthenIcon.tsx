import { IconProps } from '@/types/types'
import React from 'react'

const LessthenIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
    )
}

export default LessthenIcon