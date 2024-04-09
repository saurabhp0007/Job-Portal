"use client";

import React from 'react'
import { Button } from '../ui/button'
import ArrowRight from '../icon/ArrowRight'
import ArrowLeftIcon from '../icon/ArrowLeftIcon'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PaginationProps } from '@/types/types'
import { useRouter } from "next/navigation"
import useParams from '@/hooks/useParams';

const Pagination = ({ pagination }: { pagination: PaginationProps }) => {
    const router = useRouter();
    const {
        page,
        per_page,
        location,
        salary,
        experience,
        employmentType,
        search,
        category,
        organization
    } = useParams();

    return (
        <div className="sm:justify-end flex flex-wrap items-center justify-center gap-6 mt-10">

            {/* show per page */}
            <div className="flex items-center space-x-2">
                <p className="text-text-primary text-sm font-medium">Rows per page</p>
                <Select
                    onValueChange={(value) => router.push(`?page=${page}&per_page=${value}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&experience=${experience}&employmentType=${employmentType}`)}
                >
                    <SelectTrigger className="h-9 w-[80px] border border-green-500">
                        <SelectValue placeholder={per_page} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 40, 60, 80, 100].map((pageSize: any) => (
                            <SelectItem
                                className="text-text-primary"
                                key={pageSize}
                                value={pageSize}

                            >
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* count page */}
            <div className="text-text-primary text-sm font-medium">
                Page {pagination?.totalPage} of {pagination?.totalDocuments}
            </div>

            {/* pagination */}
            <div className="flex justify-end gap-4">
                <Button variant="outline" size="sm" disabled={Number(page) <= 1 ? true : false}
                    onClick={() => router.push(`?page=${Number(page) - 1}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&experience=${experience}&employmentType=${employmentType}`)}>
                    <ArrowLeftIcon />

                </Button>

                <Button variant="outline" disabled={Number(page) >= pagination.lastPage ? true : false} size="sm" onClick={() => router.push(`?page=${Number(page) + 1}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&experience=${experience}&employmentType=${employmentType}`)}>
                    <ArrowRight />
                </Button>
            </div>
        </div >
    )
}

export default Pagination