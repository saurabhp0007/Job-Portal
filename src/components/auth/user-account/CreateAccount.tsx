"use client";

import React, { useEffect } from 'react'
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
import { useSignUpUserMutation } from '@/store/api/userApi';
import { setCookie } from 'cookies-next';
import { getUserToken } from '@/store/features/userSlice';
import { useAppDispatch } from '@/store/hook';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from "next/navigation"


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
})

const CreateAccount = () => {
    const [createUser, { isLoading, error, isSuccess, data }] = useSignUpUserMutation();
    const dispatch = useAppDispatch();
    const { toast } = useToast()
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),

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
    }, [isSuccess, dispatch, toast, router, data?.token])



    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        createUser(data)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                    Create your account and find your dream job by Dashjob
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
                        <Button type="submit" disabled={isLoading}> {isLoading ? "Loading..." : "Submit"}</Button>
                    </CardContent>
                </form>

            </Form>

        </Card>
    )
}

export default CreateAccount