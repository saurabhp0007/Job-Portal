import React from 'react'
import { Skeleton } from '../ui/skeleton'

const JobCartSkeleton = () => {
    return (
        [0, 1, 2, 3, 4, 5, 6].map((item: any) => <Skeleton key={item} className='w-full h-[200px] bg-gray-200 rounded-lg mb-4' />)
    )
}

export default JobCartSkeleton