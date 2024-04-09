"use client";

import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'

import { useGetUserQuery, useUpdateUserMutation } from '@/store/api/userApi';
import { useAppSelector } from '@/store/hook';
import { Label } from '@/components/ui/label';
import UploadIcon from '@/components/icon/UploadIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Container from '@/components/shared/Container';


const ProfilePage = () => {
    const [profile, setProfile] = useState<any>(null)
    const [uploadStatus, setUploadStatus] = useState(false);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const { toast } = useToast()

    const userId = useAppSelector((state) => state.user?.user?.userId)

    const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation();
    const { data, isLoading: loading, isError: error } = useGetUserQuery({ userId })



    useEffect(() => {
        if (isError) {
            toast({
                title: "Something went wrong",
                description: "please try again later",
                variant: "destructive"
            })
            setOpen(true)
        }
    }, [isError])

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Profile update successful",
                description: "thank your for update your profile"
            })

            setOpen(false)
        }
    }, [isSuccess])


    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles) {
            setUploadStatus(true)
            const image = acceptedFiles[0]
            const formData = new FormData();
            formData.append("logo_image", image);
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}employer/upload-image`, formData).then((res) => {
                setProfile(res.data)
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
        maxSize: 1000000

    })

    const rejectionFile = fileRejections[0]?.errors?.map((error) => {
        return error.message
    })



    const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //check input empty
        if (!profile && !name) return

        const updateData = {
            profile: profile?.image_url,
            name,
        }

        //update api calling
        updateUser({ userId, updateData })


    }

    return (
        <Container className="h-screen">
            <div className="sm:w-1/2 p-4 mx-auto mt-20 rounded shadow">
                <div className="flex justify-center mt-20">
                    <div className="">
                        <Avatar className="w-28 h-28">
                            <AvatarImage src={data?.profile} alt="profile" />
                            <AvatarFallback>PP</AvatarFallback>
                        </Avatar>
                        <h3 className='mt-6 text-2xl font-semibold'>{data?.name}</h3>
                        <h5 className='mt-1 text-base font-normal'>{data?.email}</h5>

                        {/* user update dialog box */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className='mt-10' variant="secondary">Update Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>Update Profile</DialogTitle>
                                    <DialogDescription>
                                        Update your profile and find you other
                                    </DialogDescription>
                                </DialogHeader>

                                {/* dialog header */}
                                <form onSubmit={handleProfileSubmit}>
                                    {/* name field */}
                                    <div className="">
                                        <Label>Name</Label>
                                        <Input onChange={(e) => setName(e.target.value)} defaultValue={data?.name} className='mt-2' placeholder='Update name' />
                                    </div>

                                    {/* profile field */}
                                    <div className="mt-4">
                                        <Label className='mb-2'>Upload Profile</Label>
                                        <div {...getRootProps()} className={`${rejectionFile?.length && "border-red-500 "} border-input  place-items-center mt-2 grid w-full p-4 text-center border-2 border-dashed cursor-pointer`}>
                                            <input  {...getInputProps()} />
                                            <div className="text-sm text-gray-500">
                                                <UploadIcon className="w-8 h-8 mx-auto" />
                                                <div className="">
                                                    {uploadStatus ? <div className="">Uploading...</div> : profile ? <div className=""> <p className=" mt-4 text-sm font-semibold text-green-500">congratulation image upload successful</p>
                                                        <p className="mt-2 text-xs">profile.png</p></div> : <div className=""> <p className="mt-4 font-semibold">Click to upload or drag and drop</p>
                                                        <p className="mt-2 text-xs">PNG, JPG or JPEG (MAX 5 MB)</p></div>}
                                                </div>

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


                                    <Button type="submit" variant="secondary" disabled={uploadStatus || isLoading}>
                                        {isLoading ? "Pending" : "Update Profile"}
                                    </Button>

                                </form>

                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProfilePage