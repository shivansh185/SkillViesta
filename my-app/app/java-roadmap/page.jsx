'use client';

import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Starfield from '@/components/Starfeild';

const steps = [
  {
    title: '🔰 Java Basics',
    topics: [
      'Understand Java syntax and structure',
      'Master variables, types, and operators',
      'Use conditionals and control flow',
      'Work with loops and iterations',
      'Learn basic input/output operations',
    ],
  },
  {
    title: '🧠 Object-Oriented Programming',
    topics: [
      'Design classes and create objects',
      'Utilize methods and constructors',
      'Explore encapsulation and abstraction',
      'Understand inheritance and polymorphism',
      'Learn about interfaces and abstract classes',
    ],
  },
  {
    title: '🚀 Advanced Concepts',
    topics: [
      'Master exception handling',
      'Dive into multithreading',
      'Understand memory management & garbage collection',
      'Explore Java collections & generics',
      'Handle files and streams',
    ],
  },
  {
    title: '🌐 Web & Frameworks',
    topics: [
      'Get started with Spring and Spring Boot',
      'Create REST APIs with ease',
      'Use Thymeleaf or JSP for front-end integration',
      'Explore MVC architecture',
      'Deploy your first web app!',
    ],
  },
  {
    title: '🛠 Build & Dependency Tools',
    topics: [
      'Automate builds with Maven',
      'Use Gradle for modern projects',
      'Understand project structuring',
      'Handle external libraries',
    ],
  },
  {
    title: '🧪 Testing & Debugging',
    topics: [
      'Write unit tests with JUnit',
      'Mock objects with Mockito',
      'Explore TestNG for test suites',
      'Debug Java applications effectively',
    ],
  },
];

const StepNode = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [style, setStyle] = useState({ opacity: 0, transform: 'translateY(30px)' });

  useEffect(() => {
    if (isInView) {
      setStyle({
        opacity: 1,
        transform: 'translateY(0)',
        transition: `all 0.6s ease-out ${index * 0.1}s`,
      });
    }
  }, [isInView, index]);

  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-center w-full">
      <Starfield />

      {isLeft && (
        <div className="hidden md:flex w-1/2 justify-end pr-4">
          <div className="w-1 h-full bg-gradient-to-b from-blue-500/40 to-blue-300/20 rounded-full" />
        </div>
      )}

      <div
        ref={ref}
        style={style}
        className={`relative bg-white/10 hover:bg-white/20 transition duration-300 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl w-full md:w-[460px] z-10 ${
          isLeft ? 'md:ml-0 md:mr-auto' : 'md:mr-0 md:ml-auto'
        }`}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-1 bg-blue-400 ${
            isLeft ? '-right-6' : '-left-6'
          }`}
        ></div>
        <h2 className="text-xl font-extrabold text-blue-300 mb-4 flex items-center gap-2 tracking-wide">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          {step.title}
        </h2>
        <ul className="list-disc list-inside text-gray-100 space-y-1 text-sm leading-relaxed">
          {step.topics.map((topic, i) => (
            <li key={i} className="transition-all duration-300 hover:translate-x-1">
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {!isLeft && (
        <div className="hidden md:flex w-1/2 justify-start pl-4">
          <div className="w-1 h-full bg-gradient-to-b from-blue-500/40 to-blue-300/20 rounded-full" />
        </div>
      )}
    </div>
  );
};

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0c0c0c] to-[#1a1a1a] text-white px-6 py-14">
      <Head>
        <title>Java Developer Roadmap</title>
        <meta
          name="description"
          content="Follow this structured roadmap to master Java from beginner to pro."
        />
      </Head>

      <header className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-4">
          Your Java Developer Journey
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Ready to master Java? Follow this step-by-step roadmap to grow from beginner to backend expert. 🚀
        </p>
      </header>

      <div className="relative flex flex-col items-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/30 to-transparent z-0"></div>
        <div className="flex flex-col gap-24 max-w-6xl w-full z-10">
          {steps.map((step, index) => (
            <StepNode step={step} key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
