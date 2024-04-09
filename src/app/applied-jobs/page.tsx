"use client";

import DeleteIcon from '@/components/icon/DeleteIcon'
import Container from '@/components/shared/Container'
import CartSkeleton from '@/components/skeleton/CartSkeleton';
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { useCancelJobMutation, useGetAppliedJobQuery } from '@/store/api/userApi'
import { useAppSelector } from '@/store/hook'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

const AppliedJobs = () => {
    const userId = useAppSelector((state) => state.user.user?.userId)
    const { data, isLoading, isError } = useGetAppliedJobQuery({ userId })
    const [cancelJob, { isError: error, isSuccess }] = useCancelJobMutation();
    const { toast } = useToast();

    const handleCancelJob = async (jobId: string) => {
        const response = await Swal.fire({
            title: "Are you sure?",
            text: "You cancel this job",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        })

        if (response?.isConfirmed) {
            cancelJob({ jobId })
            Swal.fire(
                'Cancel!',
                'Your applied job cancel',
                'success'
            )
        }


    }

    //handle error message
    useEffect(() => {
        if (error) {
            toast({
                title: "something went wrong",
                description: "please try again later",
                variant: "default"

            })
        }
    }, [error, toast])

    //handle success message
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Job cancel successful",
            })
        }
    }, [isSuccess, toast])

    if (isLoading) return <CartSkeleton />
    return (
        <Container className='mt-6'>
            {isError ?
                <div className="">something went wrong</div> :
                data?.length ? data?.map((item: any) => (
                    <div key={item._id} className="flex justify-between p-4 mt-4 rounded-lg shadow">
                        <div className="space-y-2">
                            <h3 className='lg:text-xl text-base font-semibold text-green-500'>{item.jobId?.jobTitle}</h3>
                            <h4 className='text-sm font-medium'>Expected Salary: {item.salary}</h4>
                            <div className="flex items-center gap-2 text-sm">
                                <span> Applied On : </span>
                                {moment(item.jobId?.createdAt).format('MMMM D YY')}
                            </div>
                            <Button className='!mt-4' asChild>
                                <Link href={`/job/${item.jobId?._id}`}>Go Details Page</Link>
                            </Button>
                        </div>
                        <div className="">
                            <div className="">
                                <Button onClick={() => handleCancelJob(item._id)} variant="link" className='hover:text-red-500'>Cancel Application <DeleteIcon className='w-5 h-5 ml-2' /></Button>
                            </div>
                        </div>
                    </div>
                )) : <div className="place-items-center grid h-screen text-xl font-bold text-center">You Have not Applied Job Yet</div>}
        </Container>
    )
}

export default AppliedJobs