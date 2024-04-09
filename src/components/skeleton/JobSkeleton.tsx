import { Skeleton } from "@/components/ui/skeleton"


const JobSkeleton = () => {
    return (
        <div className="lg:w-3/4 grid grid-cols-3 gap-6 mx-auto mt-8">
            <Skeleton className="h-[80px] w-full  rounded-lg" />
            <Skeleton className="h-[80px] w-full  rounded-lg" />
            <Skeleton className="h-[80px] w-full  rounded-lg" />
        </div>
    )
}

export default JobSkeleton