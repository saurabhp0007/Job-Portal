"use client";
import { Button } from '../ui/button'
import { useRouter } from "next/navigation"

const CustomError = ({ message }: { message: string }) => {
    const router = useRouter();
    return (
        <div className='flex justify-center mt-20'>
            <div className="text-center">
                <div className="text-xl font-semibold text-red-500">{message}</div>
                <Button variant="destructive" className='mt-4' onClick={() => router.refresh}>Try Again</Button>
            </div>
        </div>
    )
}

export default CustomError