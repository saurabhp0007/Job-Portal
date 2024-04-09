"use client";

import React, { useEffect } from 'react'
import LocationIcon from '../icon/LocationIcon'
import Education from '../icon/Education'
import Experience from '../icon/Experience'
import DateIcon from '../icon/DateIcon'
import { jobInfoProps } from '@/types/types'
import moment from "moment"
import Link from 'next/link'
import { Button } from '../ui/button'
import DeleteIcon from '../icon/DeleteIcon'
import { useDeleteJobMutation } from '@/store/api/jobApi'
import { useToast } from '../ui/use-toast'
import Image from 'next/image';


const JobShowCart = ({ job, deletePost }: { job: jobInfoProps, deletePost?: boolean }) => {
    const [PostDelete, { isLoading, isSuccess }] = useDeleteJobMutation()
    const { toast } = useToast()

    const handlePostDelete = (id: string) => {
        PostDelete({ id })
    }

    //success message handler
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Delete successful",
                variant: "destructive"
            })
        }
    }, [isSuccess, toast])
    return (
        <div className="p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow">
            <Link href={`/job/${job?._id}`} className="space-y-3">
                <div className="sm:flex justify-between gap-4">
                    <div className="">
                        <h3 className="lg:text-xl text-base font-semibold text-green-500">{job?.jobTitle}</h3>
                        <h5 className="lg:text-sm mt-1 text-xs font-semibold">{job?.createdPost?.companyName}</h5>
                        {/* location */}
                        <div className="mt-4 space-y-1 text-gray-600">
                            <div className="flex items-center gap-2">
                                <LocationIcon />
                                <h6>{job?.location}</h6>
                            </div>

                            <div className="flex items-center gap-2">
                                <Education />
                                <h4>{job?.education}</h4>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <div className="flex gap-2">
                                    <Experience />
                                    <h5>1 to 3 years</h5>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="sm:mt-0 grid content-between gap-2 mt-10">
                        <div className="sm:justify-end flex">
                            <Image src={job?.createdPost?.image_url} width={100} height={100} className="object-cover rounded" alt="image" />
                        </div>
                        <div className="flex items-center self-end gap-2 mt-3 text-sm text-gray-500">
                            <DateIcon />
                            <h5 className="">{moment(job?.deadline).format('MMMM D YYYY')}</h5>
                        </div>
                    </div>

                </div>

            </Link>
            {deletePost && <div className="flex justify-end mt-2"><Button variant="destructive" onClick={() => handlePostDelete(job?._id)}><DeleteIcon /></Button></div>}
        </div>
    )
}

export default JobShowCart