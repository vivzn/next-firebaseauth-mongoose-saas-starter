"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { firebaseConfig } from '@/firebase';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react'
import useSWR from 'swr';

export const RootContext = createContext<any>("");

function RootC({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

    const [auth, setAuth] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [erBan, setErBan] = useState<any>(false);

    const pathname = usePathname();

    const fetcher = (url: string) => fetch(url).then(r => r.json())

    const { data, error } = useSWR(auth ? `/api/getcreateuser?email=${auth?.email}` : null, fetcher)

    useEffect(() => {
        if (error) {
            console.log("ERR", error);
            setErBan(true);
        }
    }, [error])

    useEffect(() => {
        if (data) {
            if(data?.data?.email) {
                setUser(data?.data)
            } else {
                
                setErBan(true);
            }
        }
    }, [data])

    onAuthStateChanged(getAuth(), function (user) {
        if (user) {
            setAuth(user);


        } else {
            setErBan(true);
        }
    });

    return (
        <RootContext.Provider value={{ auth: [auth, setAuth], user: [user, setUser] }}>
            {((!auth || !user) && !(["/", "/login"]?.includes(pathname))) ? (
                <div className='w-full h-screen grid place-content-center'>
                    {erBan ? (
                        <Card className='shadow-none px-6'>
                            <CardTitle>Oops</CardTitle>
                            <CardDescription>You are not authenticated</CardDescription>
                            <CardContent className='p-0 m-0'>
                                <Link href="/login">
                                    <Button>Login</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            ) : (
                <>
                    {children}</>
            )}
        </RootContext.Provider>
    )
}

export default RootC