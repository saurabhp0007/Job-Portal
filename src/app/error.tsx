'use client'

import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex items-center justify-center h-screen text-red-500">
            <div className="text-center">
                <h2 className="text-xl">Something went wrong!</h2>
                <Button variant="destructive" className="mt-4" onClick={() => reset()}>Try again</Button>
            </div>
        </div>
    )
}