"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button-white";
import { RainbowButton as RainbowButtonBlack } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { providerGoogle } from "@/firebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import { ChevronLeft, Facebook, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const [input, setInput] = useState("");

    const router = useRouter();

    const googleAuthProvider = () => {
        signInWithPopup(getAuth(), providerGoogle).then((res) => {
            if (res.user) {
                router.push("/dashboard")
            }
        })
    }


    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Link href="/">
                <div className="absolute inset-0 left-8 top-8 flex space-x-2">
                    <Button>
                        <ChevronLeft />
                        <span>Go Back</span>
                    </Button>
                </div>
                </Link>
            <div className="flex flex-col space-y-8 items-center">
                <div className="flex flex-col items-center space-y-3">
                    <h1 className="font-extrabold text-3xl">Welcome to Mentoria</h1>
                    <p className="text-accent-foreground text-md">Log in to you account and get started</p>
                </div>

                <div className="flex flex-col items-center w-full space-y-3">
                    <RainbowButton onClick={() => googleAuthProvider()} className="w-full">
                        Sign in with Google
                    </RainbowButton>


                    <p></p>

                    <RainbowButtonBlack className="w-full">
                        <span className="text-white">Sign in with Facebook</span>
                    </RainbowButtonBlack>
                </div>



                <br />
            </div>

        </div>
    );
}
