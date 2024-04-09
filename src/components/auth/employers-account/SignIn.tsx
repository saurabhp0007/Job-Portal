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
import { useSignInEmploymentMutation } from '@/store/api/employmentApi';
import { setCookie } from 'cookies-next';
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch } from '@/store/hook';
import { getUserToken } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';



const FormSchema = z.object({
    email: z.string().min(5, {
        message: "Email must be at least 5 characters.",
    }).email(),
    password: z.string().min(3, {
        message: "password must be at least 5 characters.",
    }),
})

const SignIn = () => {
    const { toast } = useToast()
    const dispatch = useAppDispatch();
    const router = useRouter();

    // form init
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),

    })
    const [singInEmployment, { isLoading, error, isSuccess, data }] = useSignInEmploymentMutation();

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
                title: "LogIn successful",
                description: "Thank you for login again",
            })

            setCookie("access_token", data?.token)
            dispatch(getUserToken(data?.token))
            router.push("/")
        }
    }, [isSuccess, toast, router, dispatch, data?.token])


    // handle sign in form
    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        //send data to api
        singInEmployment(data)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign In Account</CardTitle>
                <CardDescription>
                    Sign in your account and find your dream job by Dashjob
                </CardDescription>
            </CardHeader>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">

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
                        <Button type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</Button>
                    </CardContent>
                </form>

            </Form>

        </Card>
    )
}

export default SignIn