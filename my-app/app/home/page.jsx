"use client";

import Link from "next/link";
import { motion } from "motion/react";
import React, { useEffect, useState, useRef } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import ServiceCard from "@/components/ui/ServiceCard";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const [isClient, setIsClient] = useState(false);
  const blocksRef = useRef([]);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
      }
    );

    blocksRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start px-6">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900 rounded-lg"
      >
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        {isClient && <Boxes />}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            SkillViesta a place to learn and <span className="text-blue-500">Enhance</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Handcrafted Next.js starter for your next Startup, Business, Agency, or SaaS Website.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/" className="text-blue-400 hover:underline">
              Get Started →
            </Link>
            <Link href="/how-it-works" className="text-blue-400 hover:underline">
              How it Works
            </Link>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <h1 className="text-3xl font-bold text-white mt-10">Welcome to our website</h1>

      <div className="view mt-6 w-full flex flex-col items-center gap-4 px-4">
  {[...Array(5)].map((_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className={`w-full max-w-3xl h-24 flex items-center justify-center text-white text-sm text-center rounded-md shadow-md ${
        ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-purple-500"][i]
      }`}
    >
      <p className="px-4">
        Animated Content Block {i + 1} – Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </motion.div>
  ))}
</div>

      {/* About Section */}
      <div ref={aboutRef} className="flex flex-wrap justify-center gap-6">
        <section className="px-8 py-16 flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 order-1 md:order-1">
            <h4 className="text-blue-600 font-semibold uppercase">About Us</h4>
            <h2 className="text-4xl font-bold text-white mt-2">
              Better design, <br /> better experience
            </h2>
            <p className="text-gray-500 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui ligula, malesuada vel convallis in,
              tincidunt ut mi. Vestibulum sit amet.
            </p>
          </div>
          <CardContainer className="inter-var md:w-1/2 order-2 md:order-2">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                  Make things float in air
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">
                  Hover over this card to unleash the power of CSS perspective
                </CardItem>
              </div>
              <CardItem translateZ="100" className="w-full md:w-1/2 mt-4">
                <Image
                  src="/placeholder.jpg"
                  height={1000}
                  width={1000}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </section>
      </div>

      <div className="w-full py-4">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}

// StickyScroll Content
const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders...",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description: "See changes as they happen...",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image src="/linear.webp" width={300} height={300} className="h-full w-full object-cover" alt="linear board demo" />
      </div>
    ),
  },
  {
    title: "Version control",
    description: "Experience real-time updates...",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description: "Experience real-time updates...",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Running out of content
      </div>
    ),
  },
];