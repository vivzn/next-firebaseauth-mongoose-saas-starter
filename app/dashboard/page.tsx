"use client";

import React, { useContext, useEffect, useState } from 'react'
import { RootContext } from '../rootcontext'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RainbowButton } from '@/components/magicui/rainbow-button-white';
import { Filter, Plus, Search, Trash, X } from 'lucide-react';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import useSWR from 'swr';
import { ShineBorder } from '@/components/magicui/shine-border';
import Class from '../components/class';


const fetcher = (url: string, object: object) => fetch(url, {
  method: "POST",
  body: JSON.stringify(object)
}).then(r => r.json())

function DashboardPage() {

  const [user, setUser] = useContext(RootContext).user;




  const { data, error } = useSWR(`/api/getevents`, fetcher)

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if(data) {
      setClasses(data);
    }
  }, [data])

  const [moreInfo, setMoreInfo] = useState("");
  const [moreTopic, setMoreTopic] = useState("");


  if (user?.role == "mentoree") return (


    <div>

      <DotPattern
        className={cn(
          "z-[-5] opacity-[0.1]",
        )}
      />

      <h1 className='text-4xl font-bold'>Find public classes</h1>

      <div className="flex space-x-4 items-center mt-4">
        <RainbowButton className='h-9 space-x-3 items-center w-[300px]'>
          <Search className='size-4' />
          <span className='text-sm'>Search</span>
        </RainbowButton>


        <Input placeholder="Search for topic, subjects, lessons" className='w-full' />
        <Button className='w-[150px]' variant={"secondary"}>
          <Filter />
          Filter
        </Button>


      </div>


      <p className='text-md text-accent-foreground mt-4'>({classes?.length}) relevant mentors found</p>


      {classes?.length == 0 ? (<>
        <div className='flex w-full justify-center'>
          <LoadingSpinner />
        </div>

      </>) : (<div className='w-full grid grid-cols-3 gap-4 mt-4'>
        {classes?.map(({email, topic, info}, i) => (
          <Class key={i} email={email} topic={topic} info={info}/>
        ))}
      </div>)}

    </div>
  )


  if (user?.role == "mentor") {

    const createClass = async () => {
      if (moreInfo && moreTopic) {
        const data = await fetcher(`/api/add-class?email=${user?.email}&info=${moreInfo}&topic=${moreTopic}`, {});

        if (data) {
          setMoreInfo("");
          setMoreTopic("");

        } else {
          toast("Something went wrong")
        }
      }
    }

    const mClasses = classes ? classes.filter((class_: any) => class_?.email == user?.email) : []

    return <div>

      <DotPattern
        className={cn(
          "z-[-5] opacity-[0.1]",
        )}
      />

      <h1 className='text-4xl font-bold'>Your public classes</h1>

      <div className="flex space-x-4 items-center mt-4">


        <Dialog>
          <DialogTrigger asChild>
            <RainbowButton className='h-9 space-x-3 items-center w-[300px]'>
              <Plus className='size-4' />
              <span className='text-sm'>Create class</span>
            </RainbowButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create your class</DialogTitle>
              <DialogDescription>
                Add info about the class, what you will teach, and how
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span>Topic</span>
                <Input value={moreTopic} onChange={(e) => setMoreTopic(e?.target?.value)} id="name" placeholder='Eg, Python 101 Intro' className="col-span-3" />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <span>More info</span>
                <Textarea value={moreInfo} onChange={(e) => setMoreInfo(e?.target?.value)} className='bg-w-full' placeholder='Explain your classes, how it will run, what it will be about.' />
              </div>

            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button onClick={createClass} disabled={!moreInfo || !moreTopic}>Create</Button>
              </DialogTrigger>

            </DialogFooter>
          </DialogContent>
        </Dialog>






      </div>


      <p className='text-md text-accent-foreground mt-4'>You have ({mClasses?.length ?? "0"}) public classes</p>


      {mClasses?.length == 0 ? (<>
        <div className='flex w-full justify-center'>
          <LoadingSpinner />
        </div>

      </>) : (<div className='w-full grid grid-cols-3 gap-4 mt-4'>
        {mClasses?.map(({email, topic, info}, i) => (
          <Class key={i} email={email} topic={topic} info={info}/>
        ))}
      </div>)}



    </div>
  }
}

export default DashboardPage