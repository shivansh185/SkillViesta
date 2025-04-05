"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import bgImage from "@/public/resume.jpg";

export default function ResumeBuilder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [Linked, setLinked] = useState("");
  const [skills, setSkills] = useState("");
  const [workExperiences, setWorkExperiences] = useState([{ id: 1, value: "" }]);
  const [education, setEducation] = useState([{ id: 1, value: "" }]);

  const router = useRouter();

  const handleSubmit = () => {
    const resumeData = {
      name,
      phone,
      email,
      linkedIn: Linked,
      skills,
      workExperiences,
      education,
    };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    router.push("/resume-preview");
  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { id: Date.now(), value: "" }]);
  };

  const removeWorkExperience = (id) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
  };

  const handleWorkChange = (id, value) => {
    setWorkExperiences(
      workExperiences.map((exp) => (exp.id === id ? { ...exp, value } : exp))
    );
  };

  const addEducation = () => {
    setEducation([...education, { id: Date.now(), value: "" }]);
  };

  const removeEducation = (id) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const handleEducationChange = (id, value) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, value } : edu))
    );
  };

  return (
    <motion.div
      className="relative min-h-screen bg-black text-white flex flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src={bgImage}
        alt="Resume Background"
        fill
        className="absolute object-cover opacity-50"
      />

      <motion.header
        className="text-center mb-6 relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-blue-400">
          AI-Powered Resume Builder
        </h1>
        <p className="mt-2 text-gray-300 max-w-2xl">
          Create a professional resume in minutes with AI. Enter your details
          and generate a resume instantly.
        </p>
      </motion.header>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl p-6 shadow-lg bg-gray-800 text-white rounded-lg relative">
          <CardContent>
            {/* Personal Info */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.2 }}
            >
              <input
                className="p-3 border border-gray-600 bg-gray-900 text-white rounded-md"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="p-3 border border-gray-600 bg-gray-900 text-white rounded-md"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="p-3 border border-gray-600 bg-gray-900 text-white rounded-md"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 border border-gray-600 bg-gray-900 text-white rounded-md"
                placeholder="LinkedIn Profile"
                value={Linked}
                onChange={(e) => setLinked(e.target.value)}
              />
            </motion.div>

            {/* Work Experience */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-blue-300">
                Work Experience
              </h2>
              {workExperiences.map((exp, index) => (
                <div key={exp.id} className="flex items-center gap-3 mt-2">
                  <textarea
                    className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-md"
                    rows="2"
                    placeholder={`Work Experience ${index + 1}`}
                    value={exp.value}
                    onChange={(e) => handleWorkChange(exp.id, e.target.value)}
                  />
                  {workExperiences.length > 1 && (
                    <Button
                      className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                      onClick={() => removeWorkExperience(exp.id)}
                    >
                      ✖
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={addWorkExperience}
              >
                + Add Experience
              </Button>
            </div>

            {/* Education */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-blue-300">Education</h2>
              {education.map((edu, index) => (
                <div key={edu.id} className="flex items-center gap-3 mt-2">
                  <textarea
                    className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-md"
                    rows="2"
                    placeholder={`Education ${index + 1}`}
                    value={edu.value}
                    onChange={(e) =>
                      handleEducationChange(edu.id, e.target.value)
                    }
                  />
                  {education.length > 1 && (
                    <Button
                      className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                      onClick={() => removeEducation(edu.id)}
                    >
                      ✖
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={addEducation}
              >
                + Add Education
              </Button>
            </div>

            {/* Skills */}
            <textarea
              className="w-full p-3 mt-4 border border-gray-600 bg-gray-900 text-white rounded-md"
              rows="3"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            {/* Submit Button */}
            <Button
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              onClick={handleSubmit}
            >
              Generate Resume
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
