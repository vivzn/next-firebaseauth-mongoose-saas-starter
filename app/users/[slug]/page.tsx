"use client";

import { Card } from '@/components/ui/card';
import { getRole } from '@/lib/utils';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const fetcher = (url: string, object: object) => fetch(url, {
    method: "POST",
    body: JSON.stringify(object)
  }).then(r => r.json())

function Page() {
    const { slug } = useParams<any>()
    const [thisUser, setThisUser] = useState<any>(null);
    useEffect(() => {
        if (decodeURIComponent(slug) && slug) {
            fetcher(`/api/getuser?email=${decodeURIComponent(slug)}`, {}).then((data) => {
                setThisUser(data)
            })
        }
    }, [slug])

    return (
        <div className='w-full h-full flex justify-center flex-col items-center'>
            <Card className='px-6'>
                <div className='flex space-x-6'>
                    <img className='rounded-fullw-[40px] h-[40px] rounded-full' src={thisUser?.photoUrl  }/>
                <h1 className='font-semibold text-2xl'>{thisUser?.name}</h1>
                    </div>
                <p className='text-accent-foreground'>{getRole( thisUser?.role)}</p>

                

            </Card>
        </div>
    )
}

export default Page