"use client";

import DeleteIcon from '@/components/icon/DeleteIcon'
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button'
import { useDeleteJobMutation, useGetJobByUserIdQuery } from '@/store/api/jobApi'
import { useAppSelector } from '@/store/hook'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2'
import CartSkeleton from '@/components/skeleton/CartSkeleton';

const PostedJob = () => {
    const id = useAppSelector((state) => state.user.user?.userId)
    const { data, isLoading, isError } = useGetJobByUserIdQuery({ id })
    const [deleteJob, { isError: error, isSuccess }] = useDeleteJobMutation()
    const { toast } = useToast();


    //handle error message
    useEffect(() => {
        if (error) {
            toast({
                title: "something went wrong",
                description: "please try again later",
                variant: "destructive"

            })
        }
    }, [error, toast])

    //handle success message
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Job delete successful",
            })
        }
    }, [isSuccess, toast])

    //handle delete job
    const handleJobDelete = async (id: string) => {
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
            deleteJob({ id })
            Swal.fire(
                'Cancel!',
                'Your applied job cancel',
                'success'
            )
        }

    }

    if (isLoading) return <CartSkeleton />
    return (
        <Container className='mt-6'>
            {isError ?
                <div className="">something went wrong</div> :
                data?.length ? data?.map((item: any) => (
                    <div key={item._id} className=" p-4 mt-4 rounded-lg shadow">
                        <div className="flex justify-between">
                            <h3 className='lg:text-xl text-base font-semibold text-green-500'>{item.jobTitle}</h3>
                            <Button onClick={() => handleJobDelete(item._id)} variant="link" className='hover:text-red-500'>Cancel Application <DeleteIcon className='w-5 h-5 ml-2' /></Button>
                        </div>
                        <h4 className='text-sm font-medium'>Salary: {item.salary}</h4>
                        <div className="flex items-center gap-2 text-sm">
                            <span> Create post Date : </span>
                            {moment(item.createdAt).format('MMMM DD YYYY')}
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <span> Applied last Date : </span>
                            {moment(item.deadline).format('MMMM DD YYYY')}
                        </div>
                        <div className="flex justify-between">
                            <Button className='!mt-4' asChild variant="secondary">
                                <Link href={`/applied-user?jobId=${item?._id}`}>Applied Job </Link>
                            </Button>
                            <Button className='!mt-4' asChild>
                                <Link href={`/job/${item._id}`}>Go Details Page</Link>
                            </Button>

                        </div>
                    </div>


                )) : <div className="place-items-center grid h-screen text-xl font-bold text-center">You Have not Applied Job Yet</div>}
        </Container>
    )
}

export default PostedJob