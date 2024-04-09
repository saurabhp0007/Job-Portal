"use client";

import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import { Input } from '../ui/input';
import { division } from '@/data/data';
import { Button } from '../ui/button';
import { useRouter } from "next/navigation"
import { jobInfoProps } from '@/types/types';
import DisplayJobShowCase from './DisplayJobShowCase';

const Banner = () => {
    const [search, setSearch] = useState("");
    const [organization, setOrganization] = useState("");
    const [searchResult, setSearchResult] = useState<jobInfoProps[]>([]);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push(`/job?search=${encodeURIComponent(search).replace(/%20/g, "+")}&organization=${encodeURIComponent(organization).replace(/%20/g, "+")}`)

    }

    useEffect(() => {
        const fetchJobDataSearch = async () => {
            try {
                const response = await fetch(search && `${process.env.NEXT_PUBLIC_BASE_URL}job/suggestion-jobs?search=${search}`)
                const data = await response.json();
                setSearchResult(data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchJobDataSearch();

        if (!search) {
            setSearchResult([]);
        }
    }, [search])







    return (
        <div className="text-center">
            <h1 className="lg:text-5xl text-3xl font-semibold">Find Your Dream<span className="text-green-500"> IT</span> Job BY DeshJ<span className="font-bold text-green-500">O</span>b</h1>
            <p className="lg:text-sm mt-4 text-xs font-medium text-gray-500">Let us connect you with your next employer or employee.</p>

            {/* job search bar  */}
            <form onSubmit={handleSubmit} className="lg:w-3/4 relative w-full p-4 mx-auto mt-8 bg-green-500 border border-gray-200 rounded-lg shadow-sm">
                <div className="grid items-center md:grid-cols-[1fr_200px_auto] gap-4">

                    {/* search input field */}
                    <Input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search by keyword" className="text-semibold" />




                    {/* job type select box */}
                    <Select onValueChange={(value) => setOrganization(value)}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Organization Type" className="text-xs" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="government">Government</SelectItem>
                            <SelectItem value="semi government">Semi Government</SelectItem>
                            <SelectItem value="private-company">Private company</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button size="lg" className="bg-green-800">Search</Button>

                </div>

                {/* suggestion search */}
                {searchResult?.length ? <div className="w-full bg-white absolute top-[100%] left-0 border-2 border-green-500 rounded-lg">
                    {searchResult?.map((search) => (
                        <div className="" key={search._id}>
                            <Link href={`/job?search=${encodeURIComponent(search.jobTitle).replace(/%20/g, "+")}`} className="text-gray-500 p-1.5 hover:bg-gray-200 block">{search.jobTitle}</Link>
                        </div>
                    ))}
                </div> : null}
            </form>


            {/* render division list */}
            <div className="lg:w-3/4 flex flex-wrap justify-center gap-4 mx-auto mt-10">
                {division?.slice(1, division.length)?.map((item) => (
                    <Link key={item.id} href="#" className=" hover:bg-green-500 hover:text-white px-4 py-1 text-sm font-medium text-gray-600 duration-300 bg-white border border-gray-300 rounded-full">
                        <h4>{item.city}</h4>
                    </Link>
                ))}
            </div>

            {/* show current job vacancy*/}
            <DisplayJobShowCase />
        </div>
    )
}

export default Banner