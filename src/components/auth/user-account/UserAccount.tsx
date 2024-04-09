"use client";

import React from 'react'
import Container from "@/components/shared/Container"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';



const UserAccount = () => {
    return (
        <Container>
            <Tabs defaultValue="sign-in" className="sm:w-1/2 mx-auto mt-10">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create-account">Create Account</TabsTrigger>
                    <TabsTrigger value="sign-in">Log In</TabsTrigger>
                </TabsList>

                {/* create user account */}
                <TabsContent value="create-account">
                    <CreateAccount />
                </TabsContent>

                {/* sign in user  */}
                <TabsContent value="sign-in">
                    <SignIn />
                </TabsContent>
            </Tabs>
        </Container>
    )
}

export default UserAccount