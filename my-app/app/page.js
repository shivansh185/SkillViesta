import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Link from "next/link";

export default function Home() {
  return (
    <AuroraBackground className="bg-black text-gray-300 flex items-center justify-center min-h-screen flex-col">
      <div className="h-[50rem] flex flex-col items-center justify-center">
        <TextHoverEffect text="SkillViesta" textSize="text-[3.5vw] md:text-[4vw] lg:text-[2.5vw]" />
        <p className="text-lg md:text-xl lg:text-2xl mt-2">
          India&apos;s best site to improve your career and upskill yourself
        </p>
      </div>

      {/* ✅ Fixed Link & Button */}
      <div>
        <Link href="/home">
          
            Get Started
    
        </Link>
      </div>

      <div>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-0 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Enhance your skills and get ahead in your career
        </h1>
      </div>
    </AuroraBackground>
  );
}
