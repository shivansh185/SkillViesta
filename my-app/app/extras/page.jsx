"use client";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Starfield from "@/components/Starfeild";

export default function LandingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in"); // Redirect if user is not logged in
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) return null; // Prevent flickering before auth check

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 text-white">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-6xl relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-white">
              Services
            </span>
            <br /><br />
            Ace Your Career with AI-Powered Interview Prep & Learning
          </h1>
          <p className="text-gray-300 mb-6">
            Get AI-driven insights for your resume, master Data Structures & Algorithms in multiple languages, and excel in interviews.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-600 text-white px-6 py-3">Try Free</Button>
          </div>
        </motion.section>

        <motion.section
          variants={cardContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl w-full"
        >
          <FeatureCard 
            title="Interview Preparation" 
            description="Prepare with AI-driven mock interviews, coding assessments, and real-world questions."
            details="Practice with AI-powered simulations, receive instant feedback, and get personalized improvement suggestions tailored to your experience level."
            image="/interview.jpg"
            link="/interview-prep"
          />
          <FeatureCard 
            title="AI Resume Builder" 
            description="Generate job-winning resumes with AI insights tailored to your career goals."
            details="Our AI analyzes your experience, suggests keyword optimizations, and formats your resume for ATS compatibility."
            image="/resume2.jpeg"
            link="/resume-builder"
          />
          <FeatureCard 
            title="DSA & Learning" 
            description="Master Data Structures & Algorithms with interactive courses in Python, Java, and more."
            details="Engage with real-world coding challenges, visualize complex algorithms, and track your learning progress."
            image="/learning.jpeg"
            link="/dsa-learning"
          />
        </motion.section>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, details, image, link }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div variants={cardVariants} whileHover={{ scale: 1.05 }}>
      <Card className="p-6 shadow-lg border border-gray-700 rounded-2xl bg-gray-900 min-h-[550px] flex flex-col justify-between">
        <Image src={image} alt={title} width={400} height={250} className="rounded-t-2xl mb-4" />
        <CardContent className="flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-300 mb-4">{description}</p>
            {expanded && <p className="text-gray-400 mt-2">{details}</p>}
          </div>
          <div className="flex flex-col gap-3 mt-auto">
            <Button variant="link" className="text-blue-400" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show Less" : "Learn More"}
            </Button>
            <Button
              className="bg-blue-600 text-white px-4 py-2"
              onClick={() => router.push(link)}
            >
              Visit Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
