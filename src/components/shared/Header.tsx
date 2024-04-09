"use client";

import React, { useEffect, useState } from 'react'
import Container from './Container'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LaptopIcon from '../icon/LaptopIcon'
import UserIcon from '../icon/UserIcon'
import { useRouter, usePathname } from "next/navigation"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import HamburgerIcon from '../icon/HamburgerIcon';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { deleteCookie, getCookie } from 'cookies-next';
import { logOut } from '@/store/features/userSlice';
import { cn } from '@/lib/utils';
import Favorite from '../icon/Favorite';
import { jwtDecode } from "jwt-decode"
import { useGetUserQuery } from '@/store/api/userApi';
import { useGetEmploymentQuery } from '@/store/api/employmentApi';


const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const isLogin = useAppSelector((state) => state.user.user)

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const token = getCookie("access_token");
    const decode = token ? jwtDecode(token) : null
    const expToken = Number(new Date()) / 1000 >= (decode as any)?.exp
    const userId = useAppSelector((state) => state.user?.user?.userId)

    const { data, isLoading: loading, isError: error } = useGetUserQuery({ userId })
    const { data: employmentData } = useGetEmploymentQuery({ userId });

    //user logout when jwt token is expire
    useEffect(() => {
        if (expToken) {
            deleteCookie("access_token")
            dispatch(logOut())
            router.push("/")
        }
    }, [expToken, dispatch])



    const handleUserAccountLink = () => {
        router.push("/user-account")
    }

    const handleEmployersLink = () => {
        router.push("/employers-account")
    }


    const handleFavoriteRoute = () => {
        router.push("/favorite")
    }

    const handleLogOut = () => {
        deleteCookie("access_token")
        dispatch(logOut())
        router.push("/")
    }




    return (
        <Container className="relative flex items-center justify-between py-2 border-b border-gray-200">
            <div className=" text-2xl font-semibold">DeshJ<span className='font-bold text-green-500'>O</span>b</div>

            <div className="sm:block hidden">
                <div className="flex gap-4">
                    <Link href="/" className={cn("p-2 text-sm font-medium", pathname === "/" && "active_link")} >Home</Link>
                    <Link href="/category" className={cn("p-2 text-sm font-medium", pathname === "/category" && "active_link")}>Category</Link>
                    <Link href="/job" className={cn("p-2 text-sm font-medium", pathname === "/job" && "active_link")}>Jobs</Link>
                </div>
            </div>




            <div className="root flex items-center">
                {/* Log in user status */}
                <div className="flex gap-4">
                    {isLogin ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="sm:w-10 sm:h-10 w-8 h-8 border border-green-500" >
                                    <AvatarImage src={data ? data?.profile : employmentData?.image_url} alt="profile_image" sizes='4xl' />
                                    <AvatarFallback className='text-lg'>{data ? data?.name?.slice(0, 1) : employmentData?.name?.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent >
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {!isLogin.role && <DropdownMenuItem asChild className='cursor-pointer'>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>}
                                <DropdownMenuItem asChild className='cursor-pointer'>
                                    {isLogin.role ? <Link href="/posted-job">Your posted job</Link> : <Link href="/applied-jobs">Applied Jobs</Link>}
                                </DropdownMenuItem>

                                {isLogin.role ? <DropdownMenuItem asChild className='cursor-pointer'>
                                    <Link href="/post-job">Post Job</Link>
                                </DropdownMenuItem> : null}
                                <DropdownMenuItem onClick={handleLogOut} className='mt-2 cursor-pointer'>
                                    LogOut
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : ""}

                    <div className="sm:hidden flex items-center gap-4 cursor-pointer" >
                        <div className="" onClick={handleFavoriteRoute}>
                            <Favorite className='cursor-pointer' />
                        </div>
                        <div className="" onClick={() => setShowNav((prev) => !prev)}>
                            <HamburgerIcon />
                        </div>

                    </div>
                </div>


                {/* not login user status */}
                <div className="sm:block hidden">
                    <div className="flex items-center gap-4">
                        <div className="">

                            {!isLogin ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">Sign in or Create account</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[350px] px-4">



                                        <div className="flex gap-4">
                                            <div className="">
                                                <div className="w-14 h-14 flex items-center justify-center mt-4 bg-blue-500 rounded-full">
                                                    <LaptopIcon className='w-10 h-10 text-white' />
                                                </div>
                                            </div>

                                            <div className="">
                                                <DropdownMenuLabel className="text-base text-center text-gray-600">User Account</DropdownMenuLabel>
                                                <p className="text-sm text-gray-500">Sign in or create your My Bdjobs account to manage your profile</p>
                                                <div className="flex justify-between mt-2">
                                                    <DropdownMenuItem>
                                                        <Button variant="link" className="hover:bg-green-500 hover:text-white" onClick={handleUserAccountLink}>
                                                            Log In
                                                        </Button>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Button variant="link" onClick={handleUserAccountLink}>Create Account</Button>
                                                    </DropdownMenuItem>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="flex gap-4 mt-2">
                                            <div className="">
                                                <div className="w-14 h-14 flex items-center justify-center mt-4 bg-blue-900 rounded-full">
                                                    <UserIcon className='w-10 h-10 text-white' />
                                                </div>
                                            </div>

                                            <div className="">
                                                <DropdownMenuLabel className="text-base text-center text-gray-600">Employers</DropdownMenuLabel>
                                                <p className="text-sm text-gray-500">Sign in or create account to find the best candidates in the fastest way</p>
                                                <div className="flex justify-between mt-2">
                                                    <DropdownMenuItem>
                                                        <Button variant="link" className="hover:bg-green-500 hover:text-white" onClick={handleEmployersLink}>Log In</Button>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Button variant="link" onClick={handleEmployersLink}>Create Account</Button>
                                                    </DropdownMenuItem>
                                                </div>
                                            </div>

                                        </div>



                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : ""}
                        </div>
                        <div className="" onClick={handleFavoriteRoute}>
                            <Favorite className='cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>





            {/* responsive navbar */}
            {
                showNav && <div onClick={() => setShowNav((prev) => !prev)} className={`absolute z-50 transition-all  duration-300  sm:opacity-0 h-[100vh] opacity-100 p-4 left-0 top-[100%] w-full  bg-gray-200 `}>
                    <div className='mt-40'>
                        <div>
                            <div className="flex flex-col justify-center gap-1 text-center">
                                <Link href="/" className=" p-2 text-sm font-medium">Home</Link>
                                <Link href="/category" className={cn("p-2 text-sm font-medium", pathname === "/" && "active_link")}>Category</Link>
                                <Link href="/job" className={cn("p-2 text-sm font-medium", pathname === "/" && "active_link")}>Jobs</Link>
                            </div>

                            <div className="">
                                {/* not login user status */}
                                {!isLogin && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full mt-8" size="sm">Sign in or Create account</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[350px] px-4">



                                            <div className="flex gap-4">
                                                <div className="">
                                                    <div className="w-14 h-14 flex items-center justify-center mt-4 bg-blue-500 rounded-full">
                                                        <LaptopIcon className='w-10 h-10 text-white' />
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <DropdownMenuLabel className="text-base text-center text-gray-600">User Account</DropdownMenuLabel>
                                                    <p className="text-sm text-gray-500">Sign in or create your My Deshjob account to manage your profile</p>
                                                    <div className="flex justify-between mt-2">
                                                        <DropdownMenuItem>
                                                            <Button variant="link" className="hover:bg-green-500 hover:text-white" onClick={handleUserAccountLink}>
                                                                Log In
                                                            </Button>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Button variant="link" onClick={handleUserAccountLink}>Create Account</Button>
                                                        </DropdownMenuItem>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="flex gap-4 mt-2">
                                                <div className="">
                                                    <div className="w-14 h-14 flex items-center justify-center mt-4 bg-blue-900 rounded-full">
                                                        <UserIcon className='w-10 h-10 text-white' />
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <DropdownMenuLabel className="text-base text-center text-gray-600">Employers</DropdownMenuLabel>
                                                    <p className="text-sm text-gray-500">Sign in or create account to find the best candidates in the fastest way</p>
                                                    <div className="flex justify-between mt-2">
                                                        <DropdownMenuItem>
                                                            <Button variant="link" className="hover:bg-green-500 hover:text-white" onClick={handleEmployersLink}>Log In</Button>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Button variant="link" onClick={handleEmployersLink}>Create Account</Button>
                                                        </DropdownMenuItem>
                                                    </div>
                                                </div>

                                            </div>



                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}



                            </div>
                        </div>
                    </div>
                </div>
            }

        </Container >
    )
}

export default Header