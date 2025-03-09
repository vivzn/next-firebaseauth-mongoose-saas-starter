"use client";

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpDown, ChevronsUpDown, Settings, SettingsIcon, User } from 'lucide-react';
import { usePathname } from 'next/navigation'
import React from 'react'

function ComponentDashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className='p-4 px-32 border-b border-border flex justify-between space-x-8 items-center'>
                <div className='flex items-center space-x-8'>
                    <Button variant={"outline"} className=''>
                        <div className='flex space-x-[14px] items-center'>
                            <div className='w-6 h-6 rounded-full grid place-content-center bg-border'>
                                <User className='w-1 h-1 text-black/30' />
                            </div>
                            <span>Vivaan</span>
                        </div>
                        <ChevronsUpDown className="text-secondary-foreground" />
                    </Button>

                    <Tabs defaultValue="account">
                        <TabsList className='p-[6px] py-5 space-x-[6px]'>
                            <TabsTrigger className='px-4' value="dashboard">Dashboard</TabsTrigger>
                            <TabsTrigger className='px-4' value="account">Account</TabsTrigger>
                            <TabsTrigger className='px-4' value="settings">Settings</TabsTrigger>
                        </TabsList>

                    </Tabs>



                </div>
            </div>

            <div className='w-full h-full p-32 py-8'>
                <span className='text-3xl font-bold'>{pathname.replace("/", "").charAt(0).toUpperCase() + pathname.replace("/", "").slice(1)}</span>
                {children}
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