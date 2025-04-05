'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Sidebar from './Sidebar';

const questions = [
  {
    id: 1,
    question: '1. What is a class in Java?',
    placeholder: 'Your answer here...'
  },
  {
    id: 2,
    question: '2. How do you create an object from a class in Java?',
    placeholder: 'Example: ClassName obj = new ClassName();'
  },
  {
    id: 3,
    question: '3. What is the difference between a constructor and a method?',
    placeholder: 'Explain in short...'
  },
  {
    id: 4,
    question: `4. Find and fix the syntax error in this Java code:

public class SyntaxPractice {
    public static void main(String[] args) {
        int number = 10 // ← semicolon missing here
        if (number > 5) {
            System.out.println("Number is greater than 5");
        } else {
            System.out.println("Number is 5 or less");
        }
    }
}`,
    placeholder: 'Describe the syntax mistake...'
  },
  {
    id: 5,
    question: `5. What is wrong with this loop code?

public class LoopTest {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            printNumber(i);
        }

        static void printNumber(int num) {
            System.out.println("Number: " + num);
        }
    }
}`,
    placeholder: 'Explain the issue in the method definition...'
  },
  {
    id: 6,
    question: `6. Identify the error in this simple program:

public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!")
    }
}`,
    placeholder: 'What is missing or incorrect?'
  },
];

export default function ClassObjectQuestions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleAnswerChange = (value) => {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    alert('Your answers have been submitted!');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && answers[currentIndex].trim() !== '') {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar answers={answers} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start flex-1 p-6">
        <div className="text-center mb-8 mt-4">
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/javalogo.png"
              alt="Java Logo"
              width={40}
              height={40}
            />
            <h1 className="text-3xl font-bold text-white">Java Basics Quiz</h1>
          </div>
        </div>

        <Card className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl border border-zinc-700 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
          <CardContent>
            <div className="bg-zinc-950 p-6 rounded-2xl shadow-lg border border-zinc-700 mb-6 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 whitespace-pre-wrap">
                {questions[currentIndex].question}
              </h3>
              <Input
                className="mb-4 px-4 py-3 text-base text-white bg-zinc-800 border border-zinc-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400 shadow-inner transition-all duration-200"
                placeholder={questions[currentIndex].placeholder}
                value={answers[currentIndex]}
                onChange={(e) => handleAnswerChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {answers[currentIndex].trim() !== '' && currentIndex < questions.length - 1 && (
                <Button onClick={handleNext} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                  Next Question
                </Button>
              )}
              {currentIndex === questions.length - 1 && answers[currentIndex].trim() !== '' && (
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-green-400 font-semibold">
                    🎉 You have completed all the questions!
                  </div>
                  <Button onClick={handleSubmit} variant="secondary" className="bg-green-600 hover:bg-green-700 text-white">
                    Submit
                  </Button>
                </div>
              )}
            </div>

            <div className="text-sm text-zinc-400 text-right">
              Question {currentIndex + 1} of {questions.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
