"use client";

import Link from "next/link";
import AdminPage from "@/app/admin/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Banner from "@/app/growth/page";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BrainCircuit,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Header = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Check if the user is signed in

  useEffect(() => {
    if (isSignedIn) {
      router.push("/home"); // Redirect signed-in users to /home
    }
  }, [isSignedIn, router]);

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/ss.png"
            alt="logo"
            width={200}
            height={60}
            className="h-17 py-1 w-auto object-contain"
          />
        </Link>

        <Link href="/extras"><Button>services</Button></Link>
        {/* Right-side buttons */}
        <div className="flex items-center gap-x-6">
          <SignedIn>
            <Link href="/onboarding" passHref>
              <Button asChild variant="outline">
                <span>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden md:block">Industry Insight</span>
                </span>
              </Button>
            </Link>

            <Link href="/resume" passHref>
              <Button asChild variant="outline">
                <span>
                  <FileText className="h-4 w-4" />
                  <span className="hidden md:block">Resume</span>
                </span>
              </Button>
            </Link>

            <Link href="/quiz" passHref>
              <Button asChild variant="outline">
                <span>
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden md:block">Interview Preparation</span>
                </span>
              </Button>
            </Link>
            <Link href="/growth" passHref>
              <Button asChild variant="outline">
                <span>
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden md:block">learn</span>
                </span>
              </Button>
            </Link>
            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <BrainCircuit className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SignedIn>

          {/* Sign-In / User Profile Button */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
