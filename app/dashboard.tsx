"use client";

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlarmClock, ArrowUpDown, Bell, BookOpen, ChevronsUpDown, CogIcon, Computer, Gauge, LayoutDashboard, LayoutDashboardIcon, MessageCircle, Moon, Router, Settings, SettingsIcon, Slash, User, Users2, Venus } from 'lucide-react';
import { usePathname } from 'next/navigation'
import React, { Suspense, useContext, useState } from 'react'
import { RootContext } from './rootcontext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RainbowButton } from '@/components/magicui/rainbow-button-white';
import { getRole } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/magicui/magic-card';
import { Input } from '@/components/ui/input';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Link from 'next/link';

function ComponentDashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();


    const fetcher = (url: string, object: object) => fetch(url, {
        method: "POST",
        body: JSON.stringify(object)
    }).then(r => r.json())

    const [role, setRole] = useState("");
    const [checked, setChecked] = useState(false);

    const [user, setUser] = useContext(RootContext).user;

    const changeRole = async () => {
        if (!role || !checked || !user) return;

        const data = await fetcher(`/api/changerole?email=${user?.email}&role=${role}`, {});

        if (data) {
            toast("Updated");
            if (typeof window !== "undefined") window.location.reload();
        } else {
            toast("Something went wrong")
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className='w-full flex flex-col border-b border-border bg-background'>
                <div className='p-5 px-32 flex justify-between space-x-8 items-center'>
                    <div className='flex items-center space-x-8 justify-between w-full'>

                        <div className='flex space-x-4 items-center'>

                            <Avatar className='w-7 h-7'>
                                <AvatarImage src={user?.photoUrl} />
                                <AvatarFallback className='bg-secondary text-secondary-foreground text-xs font-bold'>{user?.name?.substring(0, 1).toUpperCase() ?? user?.email?.substring(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>


                            <div className='flex flex-col'>
                                <span className='font-[600]'>{user?.name}</span>
                                <span className='text-xs text-accent-foreground'>{getRole(user?.role)}</span>
                            </div>


                        </div>

                        <div className="space-x-8 items-center flex">


                            <div className='flex space-x-3 items-center'>
                                <Button variant={"outline"} className='w-9 h-9'>
                                    <Moon className='w-4 h-4 text-accent-foreground' />
                                </Button>
                                <Avatar className='w-9 h-9'>
                                    <AvatarImage src={user?.photoUrl} />
                                    <AvatarFallback className='bg-secondary text-secondary-foreground text-xs font-bold'>{user?.name?.substring(0, 1).toUpperCase() ?? user?.email?.substring(0, 1).toUpperCase()}</AvatarFallback>
                                </Avatar>


                            </div>
                        </div>





                    </div>
                </div>


                <div className='w-full h-full flex px-32'>
                    <Link href={`/dashboard`}>
                        <div className='translate-y-[1px]'>
                            <Button variant={"ghost"} className="rounded-b-[4px] w-[150px]">
                                <LayoutDashboardIcon />
                                Dashboard
                            </Button>
                            {window?.location?.href?.includes("/dashboard") && <div className='h-[2px] rounded-full relative w-full bg-white'>

                            </div>}

                        </div>
                    </Link>

                    <Link href={`/users/${user?.email}`}>
                        <div className='translate-y-[1px]'>
                            <Button variant={"ghost"} className="rounded-b-[4px] px-6 w-[150px]">
                                <User />
                                My Profile

                            </Button>
                            {window?.location?.href?.includes("/users") && <div className='h-[2px] rounded-full ins relative w-full bg-white'>

                            </div>}
                        </div>
                    </Link>

                    <Link href="/chats">
                        <div className='translate-y-[1px]'>
                            <Button variant={"ghost"} className="rounded-b-[4px] px-6 w-[150px]">
                                <MessageCircle />
                                My Chats

                            </Button>
                            {window?.location?.href?.includes("/chats") && <div className='h-[2px] rounded-full ins relative w-full bg-white'>

                            </div>}
                        </div></Link>

                    <Link href="/chats">
                        <div className='translate-y-[1px]'>
                            <Button variant={"ghost"} className="rounded-b-[4px] px-6 w-[150px]">
                                <Computer />
                                Ask AI
                            </Button>
                            {window?.location?.href?.includes("/ai") && <div className='h-[2px] rounded-full ins relative w-full bg-white'>

                            </div>}
                        </div>


                    </Link>

                    <Button variant={"ghost"} className="rounded-b-[4px] px-6 w-[150px]">
                        <BookOpen />
                        Lessons
                    </Button>

                </div>
            </div>


            <div className='w-full h-full p-32 py-8 overflow-x-hidden overflow-y-auto'>


                {(user?.role !== "" && user?.role !== "pending") ? (
                    <>
                        <Suspense>
                            {children}
                        </Suspense></>
                ) : (
                    <>
                        {user?.role == "pending" && (
                            <div className="w-full h-full grid place-content-center">

                                <h1 className='text-3xl font-bold'>Pending moderation...</h1>
                                <p className='text-lg mt-2 text-center text-accent-foreground'>You have submitted a request to be a mentor. <br /> Please check back within <b className='italic'>24 to 48 hours</b></p>
                                <Button onClick={() => (typeof window !== "undefined") && window.location.reload()} className="mt-6" variant={"outline"}>
                                    Reload
                                </Button>
                            </div>
                        )}

                        {user?.role == "" && (
                            <div className='w-full h-full flex flex-col justify-center items-center'>

                                <Card className="relative overflow-hidden bg-transparent w-fit">
                                    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                                    <CardHeader>
                                        <CardTitle className='text-xl'>I am a...</CardTitle>
                                        <CardDescription>
                                            Do you wish to be a <b className='italic'>student</b> or a <b className='italic'>mentor</b>?
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form>
                                            <div className="grid gap-4">
                                                <div className="grid gap-2">

                                                    <Select onValueChange={(e) => setRole(e)}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Choose" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">Mentor</SelectItem>
                                                            <SelectItem value="mentoree">Student</SelectItem>

                                                        </SelectContent>
                                                    </Select>

                                                    {role == "pending" && (
                                                        <>
                                                            <p className='text-sm'>Your application will be moderated</p>
                                                            <Textarea className='w-[300px]' placeholder="Introduce yourself. Why do you want to be a mentor? Past experiences. Relevant Info." />


                                                        </>
                                                    )}
                                                </div>

                                            </div>
                                        </form>
                                        <div className="flex items-center space-x-2 mt-6">
                                            <Checkbox onCheckedChange={(e) => setChecked(e as any)} checked={checked} />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Accept responsibilities
                                            </label>
                                        </div>

                                    </CardContent>
                                    <CardFooter>
                                        <RainbowButton onClick={() => changeRole()} disabled={!checked || !role} className='w-full'>
                                            <span className='text-sm'>Sign Up</span>
                                        </RainbowButton>
                                    </CardFooter>
                                </Card>
                                <p className='text-xs text-center mt-3 text-accent-foreground'>© Mentoria 2025</p>

                            </div>
                        )}
                    </>
                )}


            </div>
        </div>
    )
}


function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();
    const needsDashboard = !(["/", "/login"]?.includes(pathname))



    return (
        <>
            {needsDashboard ? (
                <ComponentDashboard>
                    {children}
                </ComponentDashboard>
            ) : (<>{children}</>)}

        </>
    )
}

export default Dashboard