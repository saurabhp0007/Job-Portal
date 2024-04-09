"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { division } from '@/data/data';
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadIcon from "@/components/icon/UploadIcon";
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useSignUpEmploymentMutation } from "@/store/api/employmentApi";
import { setCookie } from "cookies-next";
import { getUserToken } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";




const FormSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    email: z.string().min(5, {
        message: "Email must be at least 5 characters.",
    }).email(),
    password: z.string().min(3, {
        message: "password must be at least 5 characters.",
    }),
    companyName: z.string().min(5, {
        message: "company name must be at least 5 characters.",
    }),
    companySize: z.string(),
    companyLocation: z.string(),
    companyAddress: z.string(),
    companyDescription: z.string(),
    tradeLicense: z.string(),
    websiteURL: z.string().url(),
})

const CreateAccount = () => {
    const [logoImage, setLogoImage] = useState<any>(null)
    const [uploadStatus, setUploadStatus] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),

    })

    const { toast } = useToast()
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [createEmployment, { isLoading, error, data, isSuccess }] = useSignUpEmploymentMutation();


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
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
        },
        maxSize: 5242880

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
                title: "Account created successful",
                description: "Thank you for create account",
            })

            setCookie("access_token", data?.token)
            dispatch(getUserToken(data?.token))
            router.push("/")
        }
    }, [isSuccess, router, toast, dispatch, data?.token])




    // create employment 
    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (!logoImage) {
            toast({
                title: "please upload a image",
                variant: "destructive"
            })

            return
        }
        createEmployment({ ...data, image_url: logoImage?.image_url, image_id: logoImage?.image_id })

    }
    return (
        <Card>
            <CardHeader className='text-center'>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                    Create your account and find your dream job by DashJob
                </CardDescription>
            </CardHeader>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-8">
                        {/* personal info */}
                        <div className="">
                            <h2 className="text-lg font-semibold text-green-500">Account Information</h2>
                            <div className="sm:grid-cols-3 grid grid-cols-1 gap-4 mt-4">
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

                                {/* password field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* company details */}
                        <div className="">
                            <h2 className="text-lg font-semibold text-green-500">Company Details Information</h2>
                            <div className="sm:grid-cols-2 grid grid-cols-1 gap-4 mt-4">
                                {/* company name field */}
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* company size field */}
                                <FormField
                                    control={form.control}
                                    name="companySize"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Size</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Company Size" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1-25 employees">1-25 employees</SelectItem>

                                                    <SelectItem value="1-50 employees">1-50 employees</SelectItem>
                                                    <SelectItem value="1-100 employees">1-100 employees</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* company address division field */}
                                <FormField
                                    control={form.control}
                                    name="companyLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Address</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Company Size" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {division?.slice(1, division?.length)?.map((location) => (
                                                        <SelectItem key={location.id} value={location.city}>{location.city}</SelectItem>
                                                    ))}


                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* company address field */}
                                <FormField
                                    control={form.control}
                                    name="companyAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Write Company Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Write company address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* company description field */}
                                <FormField
                                    control={form.control}
                                    name="companyDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Write Company Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Write company description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* trade license field */}
                                <FormField
                                    control={form.control}
                                    name="tradeLicense"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business/ Trade License No</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter trade license" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* password field */}
                                <FormField
                                    control={form.control}
                                    name="websiteURL"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website URL</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter website URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* company logo field */}
                                <div className="">
                                    {logoImage ? <img className=" h-[150px] w-[150px] mx-auto rounded-full  object-cover" src={logoImage?.image_url} alt="" /> : <div {...getRootProps()} className={`${rejectionFile?.length && "border-red-500 "} border-input  place-items-center grid w-full p-4 text-center border-2 border-dashed cursor-pointer`}>
                                        <input  {...getInputProps()} />
                                        <div className="text-sm text-gray-500">
                                            <UploadIcon className="w-8 h-8 mx-auto" />
                                            <div className="">
                                                {uploadStatus ? <div className="">Uploading...</div> : <div className=""> <p className="mt-4 font-semibold">Click to upload or drag and drop</p>
                                                    <p className="mt-2 text-xs">PNG, JPG or JPEG (MAX 5 MB)</p></div>}
                                            </div>

                                        </div>
                                    </div>
                                    }
                                    {/* file error message */}
                                    <div className="">
                                        {rejectionFile &&
                                            <p className="whitespace-nowrap mt-2 text-sm font-medium text-red-500">{rejectionFile}</p>
                                        }
                                    </div>

                                </div>




                            </div>
                        </div>
                        <Button type="submit" size="lg" disabled={uploadStatus || isLoading}> {isLoading ? "Loading...." : "Submit"}</Button>
                    </CardContent>
                </form>

            </Form>
        </Card>
    )
}

export default CreateAccount