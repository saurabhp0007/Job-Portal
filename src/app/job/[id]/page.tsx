import Details from '@/components/job/Details'
import JobSummary from '@/components/job/JobSummary'
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button'
import { jobInfoProps } from '@/types/types'
import moment from 'moment'
import { Metadata } from 'next'
import Link from "next/link"



type ParamsProps = {
    params: {
        id: string
    }
}



const getJobById = async (postId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}job/get-job/${postId}`, { cache: "no-cache" })
        return response.json();
    } catch (error) {
        throw new Error("something went wrong")
    }
}

//generate SSG
export async function generateStaticParams() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}job/get-jobs`).then((res) => res.json())
    return data?.jobs?.map((job: any) => ({
        id: job._id,
    }))
}


//generate metadata for seo
export async function generateMetadata({ params: { id } }: ParamsProps): Promise<Metadata> {
    const jobData: jobInfoProps = await getJobById(id);
    if (!jobData) {
        return {
            title: "Not Found",
            description: "this page not found"
        }
    }
    return {
        title: jobData?.jobTitle,
        description: jobData?.jobContext
    }
}


const page = async ({ params: { id } }: ParamsProps) => {
    const jobData: jobInfoProps = await getJobById(id);
    return (
        <Container>
            <div className="grid sm:grid-cols-[2fr_1fr] grid-cols-1 gap-6 mt-10">
                <Details jobDetailsData={jobData} />
                <div>
                    <JobSummary jobDetailSummary={jobData} />
                </div>
            </div>

            <div className="flex justify-center mt-20">
                <div className="">
                    <p><span className='text-lg font-medium text-red-500'>*Photograph</span> must be enclosed with the resume.</p>
                    <div className="mt-10 text-center">


                        <h4 className='text-lg font-semibold'>Apply Procedure</h4>
                        <Button size="default" className='px-10 mt-6 text-base' asChild>
                            <Link href={`/apply?id=${id}`}>Apply</Link>
                        </Button>

                        {/* apply with email */}

                        <div className="mt-12">
                            <h4 className='text-lg font-semibold'>Email</h4>
                            <h5 className='mt-4'>Send your CV to <strong>{jobData?.applyEmail}</strong> </h5>
                            <p className="mt-2 text-sm text-gray-700">Application Deadline : <strong>{moment(jobData?.deadline).format("D MMMM YYYY")}</strong> </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default page