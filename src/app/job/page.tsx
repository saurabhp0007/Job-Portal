"use client";

import CustomError from '@/components/error/Error';
import Pagination from '@/components/job/Pagination'
import Sidebar from '@/components/job/Sidebar'
import Container from '@/components/shared/Container'
import JobShowCart from '@/components/shared/JobShowCart'
import JobCartSkeleton from '@/components/skeleton/JobCartSkeleton';
import EmptyData from '@/components/svg/EmptyData';
import useParams from '@/hooks/useParams'
import { useGetJobQuery } from '@/store/api/jobApi'
import { jobInfoProps } from '@/types/types'


const JobsPage = () => {
    const { page,
        per_page,
        location,
        salary,
        category,
        search,
        organization,
        experience,
        employmentType } = useParams();

    const { data, isLoading, isError } = useGetJobQuery({
        page,
        per_page,
        location,
        salary,
        category,
        search,
        organization,
        experience,
        employmentType
    })


    return (
        <Container className="grid sm:grid-cols-[1fr_3fr] grid-cols-1 gap-6 sm:mt-10 mt-4">
            {/* sidebar filter */}
            <div className="">
                <Sidebar />
            </div>

            {/* main content */}

            <div className="">
                <h2 className='mb-2 text-base font-semibold'>Job Found {data?.metadata.totalDocuments}</h2>
                <div>
                    {isLoading ? <JobCartSkeleton /> : isError ? <CustomError message="Something went wrong" /> : data?.jobs?.length ?
                        data?.jobs?.map((job: jobInfoProps) => (
                            <JobShowCart job={job} key={job._id} />
                        ))
                        : <div className="text-center">
                            <EmptyData className='w-60 h-60 mx-auto mt-20' />
                            <h3 className='text-xl font-semibold text-green-500'>Data not found</h3>
                        </div>}

                    {/* pagination start from here */}
                    {data?.jobs?.length ? <Pagination pagination={data?.metadata} /> : null}
                </div>
            </div>


        </Container >
    )
}

export default JobsPage