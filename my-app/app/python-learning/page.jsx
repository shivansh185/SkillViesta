'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function PythonLearnPage() {
  return (
    <div className="p-10 min-h-screen bg-black text-white flex flex-col items-center space-y-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl space-y-6"
      >
        <h1 className="text-6xl font-extrabold flex items-center justify-center gap-4">
          <span className="bg-yellow-500 p-4 rounded-lg text-4xl">🐍</span> Learn Python
        </h1>
        <p className="text-gray-400 text-xl">
          Learn Python programming online with our practical course. Solve problems to test your knowledge of basic syntax and object-oriented programming.
        </p>
        <div className="flex justify-center gap-6 text-gray-300 text-lg">
          <span className="flex items-center gap-2 text-yellow-400"><Star size={28} /> 4.7</span>
          <span>33 Lessons</span>
          <span>Beginner Level</span>
          <span>154.5k Learners</span>
        </div>
        <Button className="mt-6 text-xl px-6 py-3 bg-blue-500 hover:bg-blue-600">Start Learning</Button>
      </motion.div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-4xl">
        <p className="text-gray-400 text-xl mb-2">Your Progress:</p>
        <Progress value={0} className="w-full bg-gray-700 h-3" />
        <p className="text-gray-400 text-right text-lg mt-2">0%</p>
      </div>
      
      {/* Roadmap Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-3xl text-center"
      >
        <h2 className="text-3xl font-bold text-yellow-500">Python with Beginner DSA Roadmap ⚡</h2>
        <div className="space-y-4 mt-6 text-gray-300 text-xl">
          <div className="border-b border-gray-700 pb-3">
            <p className="font-semibold">Learn Python</p>
            <p className="text-lg">2 Courses</p>
          </div>
          <div>
            <p className="font-semibold">Beginner DSA in Python</p>
            <p className="text-lg">4 Courses</p>
          </div>
        </div>
        <Button variant="ghost" className="mt-6 text-yellow-400 text-xl flex items-center gap-2">
          View Roadmap <span className="text-3xl">🐍</span>
        </Button>
      </motion.div>
    </div>
  );
}