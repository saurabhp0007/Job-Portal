"use client";

import Container from "@/components/shared/Container"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

const EmployersAccount = () => {
    return (
        <Container>
            <Tabs defaultValue="sign-in" className="sm:w-4/5 mx-auto mt-10">
                <TabsList className=" grid grid-cols-2">
                    <TabsTrigger value="create-account">Create Account</TabsTrigger>
                    <TabsTrigger value="sign-in">Log In </TabsTrigger>
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

export default EmployersAccount