"use client";

import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { division } from '@/data/data'
import LessthenIcon from '../icon/LessthenIcon';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import useParams from '@/hooks/useParams';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Sidebar = () => {
    const router = useRouter();
    const {
        page,
        per_page,
        location,
        salary,
        category,
        search,
        organization,
        experience,
        employmentType } = useParams();



    return (
        <>

            <div className="sm:block sticky top-0 hidden">
                <ScrollArea className="h-screen">
                    <div className=" p-4 bg-white rounded-lg">
                        <h3 className="text-lg font-semibold">Filter</h3>

                        {/* location state from here */}
                        <div className="mt-2">
                            <h4 className="text-base font-semibold">Location</h4>
                            <RadioGroup defaultValue={location} className='mt-2' onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${value}&salary=${salary}&experience=${experience}&employmentType=${employmentType}`)}>
                                {division?.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-gray-500">
                                        <RadioGroupItem value={item.city} id={item.city} />
                                        <Label htmlFor={item.city}>{item.city}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* salary state from here */}
                        <div className="mt-4">
                            <h4 className="text-base font-semibold">Salary</h4>
                            <RadioGroup onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${value}&experience=${experience}&employmentType=${employmentType}`)} defaultValue={salary} className='mt-2'>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="any" id="r1" />
                                    <Label htmlFor="r1">Any</Label>
                                </div>

                                <div className="flex items-center space-x-1 text-gray-500">
                                    <RadioGroupItem value="30000" id="r2" />
                                    <Label htmlFor="r2" className="flex"><LessthenIcon /> 30K</Label>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-500">
                                    <RadioGroupItem value="50000" id="r3" />
                                    <Label htmlFor="r3" className='flex'><LessthenIcon />50K</Label>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-500">
                                    <RadioGroupItem value="80000" id="r4" />
                                    <Label htmlFor="r4" className='flex'><LessthenIcon />80K</Label>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-500">
                                    <RadioGroupItem value="100000" id="r5" />
                                    <Label htmlFor="r5" className='flex'><LessthenIcon />100K</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* date of post state from here */}
                        {/* <div className="mt-4">
                        <h4 className="text-base font-semibold">Date Of Post</h4>
                        <RadioGroup onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&location=${location}&salary=${salary}&date=${value}`)} defaultValue="all" className='mt-2'>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <RadioGroupItem value="all" id="r1" />
                                <Label htmlFor="r1">All time</Label>
                            </div>

                            <div className="flex items-center space-x-2 text-gray-500">
                                <RadioGroupItem value="1" id="r2" />
                                <Label htmlFor="r2">Last 24 hour</Label>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <RadioGroupItem value="7" id="r3" />
                                <Label htmlFor="r3">Last 7 days</Label>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <RadioGroupItem value="30" id="r4" />
                                <Label htmlFor="r4">Last month</Label>
                            </div>
                        </RadioGroup>
                    </div> */}

                        {/* experience level start from here */}
                        <div className="mt-4">
                            <h4 className="text-base font-semibold">Experience level</h4>
                            <RadioGroup defaultValue={experience} onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&experience=${value}&employmentType=${employmentType}`)} className='mt-2'>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="any" id="r1" />
                                    <Label htmlFor="r1">Any experience</Label>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="internship" id="r2" />
                                    <Label htmlFor="r2">Internship</Label>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="entry-level" id="r3" />
                                    <Label htmlFor="r3">Entry level</Label>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="senior-level" id="r4" />
                                    <Label htmlFor="r4">Senior level</Label>
                                </div>

                            </RadioGroup>
                        </div>

                        {/* type of employment state from here */}
                        <div className="mt-4">
                            <h4 className="text-base font-semibold">Type of employment</h4>
                            <RadioGroup defaultValue={employmentType} onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&experience=${experience}&employmentType=${value}`)} className='mt-2'>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="any" id="r1" />
                                    <Label htmlFor="r1">Any</Label>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="on-side" id="r2" />
                                    <Label htmlFor="r2">On-side</Label>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="part-time" id="r3" />
                                    <Label htmlFor="r3">Part-time</Label>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <RadioGroupItem value="remote" id="r4" />
                                    <Label htmlFor="r4">Remote</Label>
                                </div>

                            </RadioGroup>
                        </div>
                    </div>
                </ScrollArea>

            </div>






            {/* responsive Sidebar */}
            <div className="sm:hidden sticky top-0 block">
                <div className="px-2 py-4 bg-white rounded-lg">
                    <h3 className="text-lg font-semibold">Filter</h3>

                    <div className="grid items-center grid-cols-2 gap-2">
                        {/* location state from here */}
                        <div className="mt-2">
                            <h4 className="sm:text-base mb-1 text-xs font-semibold">Location</h4>
                            <Select defaultValue={location} onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${value}&salary=${salary}&experience=${experience}&employmentType=${employmentType}`)}>
                                <SelectTrigger>
                                    <SelectValue className='text-xs' placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup className='text-xs'>
                                        {division?.map((item) => (
                                            <SelectItem value={item.city} key={item.id}>{item.city}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>

                        {/* salary state from here */}
                        <div >
                            <h4 className="sm:text-base mb-1 text-xs font-semibold">Salary</h4>
                            <Select onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${value}&experience=${experience}&employmentType=${employmentType}`)} defaultValue={salary}>
                                <SelectTrigger >
                                    <SelectValue className='text-xs' placeholder="Salary" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="any">any</SelectItem>
                                        <SelectItem value="30000">30K</SelectItem>
                                        <SelectItem value="50000">50K</SelectItem>
                                        <SelectItem value="80000">80K</SelectItem>
                                        <SelectItem value="100000">100K</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>



                        {/* experience state from here */}
                        <div className="mt-2">
                            <h4 className="sm:text-base mb-1 text-xs font-semibold">Work experience</h4>
                            <Select defaultValue={experience} onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&experience=${value}&employmentType=${employmentType}`)}>
                                <SelectTrigger >
                                    <SelectValue className="text-xs" placeholder="Experience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="any">Any Experience</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                        <SelectItem value="entry-level">Entry Level</SelectItem>
                                        <SelectItem value="senior-level">Senior Level</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* type of employment state from here */}
                        <div className="mt-2">
                            <h4 className="sm:text-base mb-1 text-xs font-semibold">Type of employment</h4>
                            <Select defaultValue={employmentType} onValueChange={(value) => router.push(`?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&experience=${experience}&employmentType=${value}`)}>
                                <SelectTrigger>
                                    <SelectValue className='text-xs' placeholder="Employment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="any">Any</SelectItem>
                                        <SelectItem value="on-side">On-side</SelectItem>
                                        <SelectItem value="part-time">Part-time</SelectItem>
                                        <SelectItem value="remote">remote</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}

export default Sidebar