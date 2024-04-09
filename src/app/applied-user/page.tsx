"use client";

import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button';
import { useGetJobByEmploymentQuery } from '@/store/api/jobApi'
import React from 'react'
import { useSearchParams } from "next/navigation"
import JobCartSkeleton from '@/components/skeleton/JobCartSkeleton';

const AppliedUser = () => {
    const params = useSearchParams();
    const jobId = params.get("jobId")
    const { data, isLoading, isError } = useGetJobByEmploymentQuery({ jobId })

    if (isLoading) return <Container className="mt-6"><JobCartSkeleton /></Container>


    return (
        <Container className='mt-6'>
            {isError ?
                <div className="">something went wrong</div> :
                data?.length ? data?.map((item: any) => (
                    <div key={item._id} className="flex justify-between p-4 mt-4 rounded-lg shadow">
                        <div className="space-y-1">
                            <h3 className='lg:text-xl text-base font-semibold text-green-500'>{item.name}</h3>
                            <h4 className='text-sm font-medium'>Email: {item.email}</h4>
                            <h4 className='text-sm font-medium'>Phone: {item.phone}</h4>


                            <Button className='!mt-4' asChild variant="secondary">
                                <a href={`${item.resume}`}>View Resume</a>
                            </Button>
                        </div>
                    </div>
                )) : <div className="place-items-center grid h-screen text-xl font-bold text-center">You Have not Applied Job Yet</div>}
        </Container>
    )
}

export default AppliedUser