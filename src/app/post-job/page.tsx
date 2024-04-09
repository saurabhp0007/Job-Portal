"use client";

import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import { category, division } from '@/data/data';
import { useCreateJobMutation } from '@/store/api/jobApi';
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { useAppSelector } from '@/store/hook';
import dynamic from 'next/dynamic';
import Container from '@/components/shared/Container';
import { useRouter } from "next/navigation"



// form init
const FormSchema = z.object({
    jobTitle: z.string().min(5, {
        message: "Job title must be at least 5 characters.",
    }),
    vacancy: z.string({ required_error: "Only number allow" }).regex(/^\d+$/, { message: "Only number is allow" }).transform(Number),
    employmentType: z.string(),
    organizationType: z.string(),
    category: z.string(),
    experienceLevel: z.string(),
    location: z.string().min(5, {
        message: "Location must be at least 5 characters.",
    }),
    deadline: z.date({
        required_error: "A date of birth is required.",
    }),
    salary: z.string({ required_error: "Only number allow" }).regex(/^\d+$/, { message: "Only number is allow" }).transform(Number),
    education: z.string(),
    applyEmail: z
        .union([z.string().email(), z.string().length(0)])
        .optional()
        .transform(e => e === "" ? undefined : e)
})

const PostUserJob = () => {
    const [jobContext, setJobContext] = useState('');
    const [jobResponsibilities, setJobResponsibilities] = useState('');
    const [jobBenefit, setJobBenefit] = useState('');
    const [emptyError, setEmptyError] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),

    })
    const { toast } = useToast()
    const router = useRouter();


    const [createJob, { isLoading, error, isSuccess }] = useCreateJobMutation();
    const { user } = useAppSelector((state) => state.user)


    //error handling message
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive"

            })
        }
    }, [error, toast])

    // success message
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Job create successful",
            })
            router.push("/post-job")
        }

    }, [isSuccess, toast])




    //handle submit form
    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        if (!jobContext || !jobResponsibilities || !jobBenefit) {
            setEmptyError(true);
            return;
        }


        //send job data to api
        createJob({ userId: user?.userId, jobContext, jobResponsibilities, jobBenefit, ...data })

        //clear empty error
        setEmptyError(false)

    }
    return (
        <Container>
            <Card className='mt-10'>
                <CardHeader className='text-center'>
                    <CardTitle>Post A Job</CardTitle>
                    <CardDescription>
                        Post your job  and find your employers by Dashjob
                    </CardDescription>
                </CardHeader>

                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-8">
                            <div className="">
                                <div className="sm:grid-cols-2 grid gap-4 mt-4">

                                    {/* job title field */}
                                    <FormField
                                        control={form.control}
                                        name="jobTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Job Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Front end developer" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* number of vacancy field */}
                                    <FormField
                                        control={form.control}
                                        name="vacancy"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number Of Vacancy</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="3" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* category field */}
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select location" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {category && category?.map((item) => (
                                                            <SelectItem key={item.id} value={item.text}>{item.text}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />



                                    {/* type of employment field */}
                                    <FormField
                                        control={form.control}
                                        name="employmentType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type of employment</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select employment status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="on-side">On-side</SelectItem>
                                                        <SelectItem value="part-time">Part-time</SelectItem>
                                                        <SelectItem value="remote">Remote</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* job deadline  */}
                                    <FormField
                                        control={form.control}
                                        name="deadline"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Application Deadline</FormLabel>
                                                <Popover >
                                                    <PopoverTrigger asChild className=''>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal text-gray-500 border border-input hover:bg-popover hover:text-gray-400",
                                                                    !field.value && "text-gray-400"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="center">
                                                        <Calendar
                                                            mode="single"

                                                            selected={field.value}
                                                            onSelect={field.onChange}

                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    {/* experience level  field */}
                                    <FormField
                                        control={form.control}
                                        name="organizationType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Organization Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Organization Type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="government">Government</SelectItem>
                                                        <SelectItem value="semi-government">Semi Government</SelectItem>
                                                        <SelectItem value="private-company">Private Company</SelectItem>
                                                        <SelectItem value="freelance">Freelance</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* experience level  field */}
                                    <FormField
                                        control={form.control}
                                        name="experienceLevel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Experience level</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Workplace" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="internship">Internship</SelectItem>
                                                        <SelectItem value="entry-level">Entry level</SelectItem>
                                                        <SelectItem value="senior-level">Senior level</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/*job location field */}
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Job Location</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select location" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {division && division?.slice(1, 9)?.map((item) => (
                                                            <SelectItem key={item.id} value={item.city}>{item.city}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/*job salary field */}
                                    <FormField
                                        control={form.control}
                                        name="salary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Salary</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="30000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/*education field */}
                                    <FormField
                                        control={form.control}
                                        name="education"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Education</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="BSE in CSE" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-8 space-y-8">


                                    {/* job context field */}
                                    <div className="">
                                        <FormLabel>Job Context</FormLabel>
                                        <ReactQuill className={cn("mt-2", emptyError ? "border border-red-500" : null)} theme="snow" value={jobContext} onChange={setJobContext} />
                                        <p className='text-red-500'>{emptyError ? "Required" : null}</p>
                                    </div>

                                    {/* job responsibilities field */}
                                    <div className="">
                                        <FormLabel>Job Responsibilities</FormLabel>
                                        <ReactQuill className={cn("mt-2", emptyError ? "border border-red-500" : null)} theme="snow" value={jobResponsibilities} onChange={setJobResponsibilities} />
                                        <p className='text-red-500'>{emptyError ? "Required" : null} </p>
                                    </div>

                                    {/* other benefits field */}
                                    <div className="">
                                        <FormLabel >Compensation & Other Benefits</FormLabel>
                                        <ReactQuill className={cn("mt-2", emptyError ? "border border-red-500" : null)} theme="snow" value={jobBenefit} onChange={setJobBenefit} />
                                        <p className='text-red-500'>{emptyError ? "Required" : null}</p>
                                    </div>

                                    {/* apply with email field */}
                                    <FormField
                                        control={form.control}
                                        name="applyEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apply with Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="saimunshezan@gmail.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>




                            </div>

                            <Button type="submit" disabled={isLoading} size="lg">{isLoading ? "Pending" : "Submit"} </Button>
                        </CardContent>
                    </form>

                </Form>

            </Card>
        </Container >
    )
}

export default PostUserJob