"use client";

import { useGetShowCaseJobQuery } from "@/store/api/jobApi"
import JobSkeleton from "../skeleton/JobSkeleton";

const DisplayJobShowCase = () => {
    const { data, isLoading, isError } = useGetShowCaseJobQuery({});
    if (isLoading) return <JobSkeleton />
    return (
        <div className="lg:w-3/4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-8 gap-y-6 grid grid-cols-1 mx-auto mt-8">
            <div className="p-4 border rounded-lg shadow">
                <h2 className='text-base font-medium text-gray-600'>Total Job</h2>
                <h3 className='mt-1 text-xl font-bold'>{data?.totalJob}</h3>
            </div>
            <div className="p-4 border rounded-lg shadow">
                <h2 className='text-base font-medium text-gray-600'>Total Vacancy</h2>
                <h3 className='mt-1 text-xl font-bold'>{data?.totalVacancy[0]?.totalVacancy}</h3>
            </div>
            <div className="p-4 rounded-lg shadow">
                <h2 className='text-base font-medium text-gray-600'>Total Company</h2>
                <h3 className='mt-1 text-xl font-bold'>{data?.totalCompany}</h3>
            </div>
        </div>
    )
}

export default DisplayJobShowCase