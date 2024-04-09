"use client";

import React, { useCallback, useEffect, useState } from 'react'
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
import { useAppSelector } from '@/store/hook';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'
import UploadIcon from "@/components/icon/UploadIcon";
import { useApplyJobMutation } from '@/store/api/userApi';


const FormSchema = z.object({
    name: z.string().min(5, {
        message: "name must be at least 5 characters.",
    }),
    email: z.string().min(5, {
        message: "Email must be at least 5 characters.",
    }).email(),
    phone: z.string().max(11).regex(/^\d+$/, { message: "Only number is allow" }).transform(Number),
    salary: z.string().regex(/^\d+$/, { message: "Only digit is allow" }).transform(Number),

})

const ApplyForm = () => {
    const [logoImage, setLogoImage] = useState<any>(null)
    const [uploadStatus, setUploadStatus] = useState(false);
    const [apply, { isLoading, error, isSuccess, data }] = useApplyJobMutation();
    const { toast } = useToast()
    const router = useRouter();
    const params = useSearchParams();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),

    })
    const userId = useAppSelector((state) => state.user.user?.userId)
    const jobId = params.get("id");




    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles) {
            setUploadStatus(true)
            const image = acceptedFiles[0]
            const formData = new FormData();
            formData.append("logo_image", image);
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}employer/upload-image`, formData).then((res) => {
                setLogoImage(res.data)
                setUploadStatus(false)
                toast({
                    title: "image upload successful",
                })
            }).catch((error) => {
                toast({
                    title: "Something went wrong",
                    description: "please try again",
                    variant: "destructive"
                })
                setUploadStatus(false)
            })

        }
    }, [toast])


    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/pdf": [".pdf"],
        },
        maxSize: 1000000

    })

    const rejectionFile = fileRejections[0]?.errors?.map((error) => {
        return error.message
    })

    //error message handler
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive"
            })
        }
    }, [error, toast])

    //success message handler
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Successfully Apply",
                description: "Thank you for applying",
            })

            router.push("/")
        }
    }, [isSuccess, toast, router])




    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (!logoImage) {
            toast({
                title: "Please upload a resume",
                description: "try again",
                variant: "destructive"
            })
            return false;
        }
        apply({ ...data, resume: logoImage?.image_url, userId, jobId })
    }
    return (
        <Card className='sm:w-8/12 mx-auto mt-10'>
            <CardHeader>
                <CardTitle>Apply Now</CardTitle>
                <CardDescription>
                    Apply now and find your dream job by Dashjob
                </CardDescription>
            </CardHeader>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">

                        {/* name field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* phone number field */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* phone number field */}
                        <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expectations Salary</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your expectations salary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* resume field */}
                        <div className="">
                            <FormLabel>Upload resume</FormLabel>
                            <div {...getRootProps()} className={`${rejectionFile?.length && "border-red-500 "} border-input  place-items-center mt-2 grid w-full p-4 text-center border-2 border-dashed cursor-pointer`}>
                                <input  {...getInputProps()} />
                                <div className="text-sm text-gray-500">
                                    <UploadIcon className="w-8 h-8 mx-auto" />
                                    {!logoImage ? <div className="">
                                        {uploadStatus ? <div className="">Uploading...</div> : <div className=""> <p className="mt-4 font-semibold">Click to upload or drag and drop</p>
                                            <p className="mt-2 text-xs">Only Allow PDF (MAX 5 MB)</p></div>}
                                    </div> : <div className=""><p className='mt-4 font-semibold'>Upload Successful</p></div>}

                                </div>
                            </div>

                            {/* file error message */}
                            <div className="">
                                <label htmlFor=""></label>
                                {rejectionFile &&
                                    <p className="whitespace-nowrap mt-2 text-sm font-medium text-red-500">{rejectionFile}</p>
                                }
                            </div>

                        </div>
                        <Button size="lg" type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Apply Now"}</Button>
                    </CardContent>
                </form>

            </Form>

        </Card>
    )
}

export default ApplyForm;