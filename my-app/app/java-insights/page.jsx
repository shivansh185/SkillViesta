'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';


// Topics with subtopics for scalability
const topics = [
  {
    title: 'Java Basics',
    subtopics: [
      'Basic Syntax',
      'Lifecycle of program',
      'Data Type',
      'Variable and Scope',
      'Type Casting',
      'String and Methods',
      'Math Operations',
      'Arrays',
      'Conditional',
      'Loops',
    ],
  },
  {
    title: 'Object-Oriented Programming',
    subtopics: [
      'Classes and Objects',
      'Attributes and Methods',
      'Access Specifiers',
      'Static Keyword',
      'Final Keyword',
      'Nested Classes',
      'Packages',
      'Exception Handling',
      'Lambda Expressions',
      'Modules',
    ],
  },
  {
    title: 'Frameworks',
    subtopics: [
      'Spring',
      'Spring Boot',
      'Hibernate',
      'Struts',
      'JavaFX',
    ],
  },
  {
    title: 'Dependencies',
    subtopics: [
      'Maven',
      'Gradle',
      'JAR vs WAR',
      'Build Tools',
    ],
  },
  {
    title: 'DSA',
    subtopics: [
      'Arrays and Strings',
      'LinkedList',
      'Stacks and Queues',
      'Trees and Graphs',
      'Recursion',
      'Searching and Sorting',
    ],
  },
];

export default function JavaLearningPageinside() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [knownSubtopics, setKnownSubtopics] = useState([]);

  const handleMarkKnown = (subtopic) => {
    if (!knownSubtopics.includes(subtopic)) {
      setKnownSubtopics((prev) => [...prev, subtopic]);
    }
  };

  const renderSubtopicCards = (subtopics) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {subtopics.map((sub) => (
        <Card key={sub} className="border border-border bg-card/60 backdrop-blur-lg shadow-xl hover:scale-[1.02] transition-all">
          <CardContent className="p-6 flex flex-col gap-4 items-start">
            <h2 className="text-xl font-semibold text-accent-foreground">{sub}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Learn about {sub.toLowerCase()} in Java programming.
            </p>
            <div className="flex gap-2">
              <Button
                variant={knownSubtopics.includes(sub) ? 'default' : 'outline'}
                onClick={() => handleMarkKnown(sub)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                I Know This
              </Button>
             <Link href="/learn-java">
             <Button variant="secondary">
                <BookOpen className="mr-2 h-4 w-4" />
                Learn
              </Button></Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-64 bg-muted p-6 border-r border-border z-10 shadow-md"
      >
        <h2 className="text-2xl font-bold decoration-primary mb-6 text-primary">
          <span className="bg-yellow-500 p-4 rounded-lg text-4xl">☕</span>{' '}
          <span className="underline">Java</span>
        </h2>
        <ul className="space-y-3">
          {topics.map((topic) => (
            <li key={topic.title} className="relative group">
              <Button
                variant={selectedTopic.title === topic.title ? 'default' : 'ghost'}
                className="w-full justify-start text-left font-medium text-base truncate relative group"
                onClick={() => setSelectedTopic(topic)}
                title={topic.title}
              >
                <span className="truncate block max-w-full">{topic.title}</span>
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-muted px-2 py-1 text-sm shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-20">
                  {topic.title}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex-1 overflow-auto bg-gradient-to-br from-background via-muted/30 to-background"
      >
        <AnimatePresence mode="wait">
          <motion.section
            key={selectedTopic.title}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto py-12 px-6"
          >
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary">
                {selectedTopic.title}
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Dive into the world of{' '}
                <span className="font-medium">{selectedTopic.title}</span> with
                interactive resources and opportunities to contribute.
              </p>
              <div className="h-px w-16 bg-primary mt-4"></div>
            </div>

            {selectedTopic.subtopics?.length > 0
              ? renderSubtopicCards(selectedTopic.subtopics)
              : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Card className="border border-border bg-card/60 backdrop-blur-lg shadow-xl hover:scale-[1.02] transition-all">
                    <CardContent className="p-6 flex flex-col gap-4 items-start">
                      <h2 className="text-xl font-semibold text-accent-foreground">
                        Know {selectedTopic.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Explore key concepts and get an overview of this topic with
                        resources tailored for learners.
                      </p>
                      <Button variant="outline">Explore</Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-border bg-card/60 backdrop-blur-lg shadow-xl hover:scale-[1.02] transition-all">
                    <CardContent className="p-6 flex flex-col gap-4 items-start">
                      <h2 className="text-xl font-semibold text-accent-foreground">
                        Teach {selectedTopic.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Share your knowledge, contribute tutorials, or mentor
                        others in this topic area.
                      </p>
                      <Button>Get Started</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
          </motion.section>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
