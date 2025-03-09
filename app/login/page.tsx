"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { providerGoogle } from "@/firebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import { Facebook, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const [input, setInput] = useState("");

    const router = useRouter();

    const googleAuthProvider = () => {
        signInWithPopup(getAuth(), providerGoogle).then((res) => {
            if(res.user) {
                router.push("/dashboard")
            }
        })
    }

    
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Card className="shadow-none w-[300px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Login to start using XXX
                    </CardDescription>

                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Button onClick={googleAuthProvider} variant={"outline"}>
                        <Image alt="Google" src={"/google.svg"} width={18} height={18} />
                        Google
                    </Button>

                    <Button variant={"outline"}>
                        <Image alt="Facebook" src={"/facebook.webp"} width={18} height={18} />
                        Facebook
                    </Button>

                    
                </CardContent>

            </Card>

        </div>
    );
}
