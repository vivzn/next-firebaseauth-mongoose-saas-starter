import { ShineBorder } from '@/components/magicui/shine-border'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { RootContext } from '../rootcontext';
import Link from 'next/link';

function Class({ email, topic, info }: any) {

  const [user, setUser] = useContext(RootContext).user;

  const fetcher = (url: string, object: object) => fetch(url, {
    method: "POST",
    body: JSON.stringify(object)
  }).then(r => r.json())

  const [thisUser, setThisUser] = useState<any>(null);

  useEffect(() => {
    if (email) {
      fetcher(`/api/getuser?email=${email}`, {}).then((data) => {
        if (data?.email) {
          setThisUser(data);
          console.log(thisUser);
        }
      })
    }
  }, [])

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Card className='relative h-[200px] hover:bg-[#131313] overflow-hidden flex flex-col justify-between px-6 gap-2 bg-[#0a0a0a] w-full'>

          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

          <div className='w-full flex space-x-4 items-center'>
            <img src={thisUser?.photoUrl} className='w-[30px] h-[30px] rounded-full' />
            <div>
              <h1 className='font-semibold'>{thisUser?.name}</h1>
            </div>
          </div>

          <div>
            <p className='text-[10px] text-accent-foreground'>Teaching</p>
            <h1 className='font-semibold text-2xl italic'>{topic}</h1>
          </div>
          <p className="text-accent-foreground text-xs w-full">{info}</p>

          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 rounded-full bg-green-500'>
              </div>
            <p className='text-sm'>Online</p>
          </div>




        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{user?.role == "mentoree" ? `Do you want to message ${thisUser?.name} for details?` : ""}</AlertDialogTitle>
          <AlertDialogDescription>
            {user?.role == "ee" ? `This will start a new chat with this ` : "This is your class"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
          {user?.role == "ee" && <Link href={`/chats/${thisUser?.email}`}><AlertDialogAction>Continue</AlertDialogAction></Link>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


  )
}

export default Class