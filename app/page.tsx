import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">


      

      <Link href={"/login"}>
        <Button className="w-fit">
          Start
        </Button>
      </Link>






    </div>
  );
}
