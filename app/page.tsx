
"use client";

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { RainbowButton } from "@/components/magicui/rainbow-button-white";
import { RainbowButton as RainbowButtonBlack } from "@/components/magicui/rainbow-button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, GraduationCapIcon, LogIn, Presentation, Venus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

export default function Home() {
  return (

    <div className="w-screen h-screen flex flex-col">

      <AnimatedGridPattern numSquares={30}
        maxOpacity={0.2}
        duration={3}
        repeatDelay={1} className="opacity-[0.6] z-[-2] skew-y-4"/>
      {/* <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "absolute [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      /> */}

      <div className="flex space-x-4 justify-between items-center w-full px-32 py-4 border-b border-border z-[100] bg-transparent backdrop-blur-sm">
        <div className="flex space-x-8 items-center">
          <div className="flex space-x-2 items-center">
            {/* <Venus className="size-5" /> */}
            <h1 className="font-bold text-xl">Mentoria</h1>
          </div>
          <p className="text-accent-foreground">About</p>
          <p className="text-accent-foreground">Terms & Conditions</p>
        </div>


        <Link href={"/login"}>
          <RainbowButton>

            <span className="text-black">Get Started</span>
          </RainbowButton>
        </Link>
      </div>





      <div className="w-full px-32 justify-center text-center">

        <div className="group relative w-fit mt-20 mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            TeensInAI IWD 2025
          </AnimatedGradientText>

        </div>

        <h1 className="text-[100px] font-extrabold text-center mt-6 leading-[105px]">A <span className=""><LineShadowText shadowColor="white">platform</LineShadowText></span> for <div className="flex items-center self-center justify-center gap-4"><SparklesText className="text-[100px]" text="Women" /> in  <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-[100px] leading-none tracking-tighter text-transparent">
          STEM.
        </span></div> </h1>

        <p className="text-xl text-center mt-4">Connecting <b className="italic">female</b> minds with <b className="italic">female</b> mentors to try and build <br /> the next generation of women.</p>

        <Link href={"/login"}>
        <div className="flex space-x-4 items-center mt-6 justify-center">
          
          <RainbowButton className="space-x-3">
          <GraduationCapIcon className="text-black size-5"/>
            <span className="text-black">Start as Student</span>
          </RainbowButton>
          <RainbowButtonBlack className="space-x-3">
          <Presentation className="text-white size-5"/>
            <span className="text-white">Start as Mentor</span>
          </RainbowButtonBlack>
        </div>
        </Link>
      </div>
    </div>
  );
}
