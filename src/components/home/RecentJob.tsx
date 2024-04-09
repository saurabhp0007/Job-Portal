import React from 'react'
import JobShowCart from '../shared/JobShowCart'
import { jobInfoProps } from '@/types/types'

const getRecentJob = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}job/get-jobs`, { cache: "no-cache" })
        return response.json();
    } catch (error) {
        throw new Error("something went wrong")
    }
}

const RecentJob = async () => {
    const { jobs }: { jobs: jobInfoProps[] } = await getRecentJob();
    return (
        <div className="mt-20">
            <h2 className="sub-title space-y-3">Recent Jobs</h2>
            {jobs?.length ? jobs?.map((job) => (
                <JobShowCart job={job} key={job._id} />
            )) : "no job found"}

        </div>
    )
}

export default RecentJob