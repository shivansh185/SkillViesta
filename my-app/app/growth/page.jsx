"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Banner = () => {
  const courseList = [
    { title: "Python", level: "Beginner", desc: "Master Python fundamentals with hands-on practice." },
    { title: "Java", level: "Beginner", desc: "Get practical experience coding in Java." },
    { title: "C++", level: "Beginner", desc: "Master basic syntax of C++ interactively." },
    { title: "Data Structures", level: "Intermediate", desc: "Deep dive into algorithms and problem-solving." },
    { title: "HTML", level: "Beginner", desc: "Build websites with HTML fundamentals." },
    { title: "JavaScript", level: "Beginner", desc: "Master JavaScript and dynamic web development." },
    { title: "CSS", level: "Beginner", desc: "Style web pages beautifully with CSS techniques." },
    { title: "React", level: "Intermediate", desc: "Build modern UI with React and its ecosystem." },
    { title: "Node.js", level: "Intermediate", desc: "Learn backend development with Node.js and Express." },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <motion.h1
        variants={fadeUp}
        custom={0}
        className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center"
      >
        Learn at Your Own Pace
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={1}
        className="mt-4 text-lg text-gray-300 max-w-xl text-center"
      >
        Master coding from scratch with hands-on courses crafted by top industry experts.
      </motion.p>

      {/* Email Form */}
      <motion.div
        variants={fadeUp}
        custom={2}
        className="mt-8 flex flex-col md:flex-row items-center w-full max-w-md"
      >
        <input
          type="email"
          className="flex-grow px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-t-md md:rounded-l-md md:rounded-tr-none outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your email"
        />
        <button className="bg-purple-600 px-4 py-3 text-white font-semibold rounded-b-md md:rounded-r-md md:rounded-bl-none hover:bg-purple-700 transition-colors duration-300 w-full md:w-auto">
          Start Learning ⚡
        </button>
      </motion.div>

      <motion.p
        variants={fadeUp}
        custom={3}
        className="mt-3 text-gray-400 text-sm"
      >
        or sign up with{' '}
        <button className="text-purple-400 hover:underline">Google</button>
      </motion.p>

      {/* Features Section */}
      <motion.div
        variants={fadeUp}
        custom={4}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {[
          {
            title: "Real-time Collaboration",
            icon: "👥",
            desc: "Code together seamlessly with live collaboration and chat features using Socket.io.",
          },
          {
            title: "Multi-Language Code Editor",
            icon: "💻",
            desc: "Write and run code in multiple programming languages with a powerful Monaco-based editor.",
          },
          {
            title: "Task & Notes Management",
            icon: "📝",
            desc: "Create and manage coding tasks efficiently while keeping track of important notes.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            custom={index + 5}
            className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-purple-500/30 transition duration-300 border border-gray-700 text-center"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-white mt-2">{feature.title}</h2>
            <p className="text-gray-300 text-sm mt-1">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Languages Section */}
      <motion.div
        variants={fadeUp}
        custom={8}
        className="mt-12 p-8 bg-gray-900 rounded-xl border border-gray-700 shadow-lg w-full max-w-6xl"
      >
        <motion.h2
          variants={fadeUp}
          custom={9}
          className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center mb-6"
        >
          Learn All of the Following
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseList.map((course, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={10 + index}
              className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-purple-500/30 transition duration-300 border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-white mb-1">{course.title}</h2>
              <p className="text-sm text-purple-400 font-medium mb-2">{course.level}</p>
              <p className="text-gray-300 text-sm">{course.desc}</p>
              <Link href={`/${course.title.toLowerCase().replace(/\+/g, 'plus').replace(/\s/g, '')}-learning`}>
                <button className="mt-4 bg-purple-600 px-4 py-2 text-white font-semibold rounded hover:bg-purple-700 transition-colors duration-300 w-full">
                  Start {course.title} Course
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
