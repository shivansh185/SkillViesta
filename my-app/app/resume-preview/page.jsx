"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ResumePreview() {
  const [resume, setResume] = useState(null);
  const [enhancement, setEnhancement] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      setResume(JSON.parse(storedData));
    }
  }, []);

  const enhanceWithAI = async () => {
    if (!resume) return;
    // Simulate AI enhancement logic
    const simulatedResponse = {
      atsScore: 78,
      issues: [
        "Phone number format should be international (+91... or +1...)",
        "Add more technical skills related to the job you're targeting",
        "Include metrics in your work experience (e.g. improved speed by 30%)",
      ],
      suggestions: [
        "Use action verbs in work experience like 'led', 'built', 'optimized'",
        "Add GitHub link if you’re a developer",
        "Tailor resume to job description",
      ],
    };
    setEnhancement(simulatedResponse);
  };

  if (!resume) return <p className="p-6 text-white">Loading Resume...</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Card className="bg-gray-900 p-6 max-w-3xl mx-auto text-white space-y-4">
        <h1 className="text-3xl font-bold text-blue-400">{resume.name}</h1>
        <p>📧 {resume.email}</p>
        <p>📱 {resume.phone}</p>
        <p>🔗 {resume.linkedIn}</p>

        <div>
          <h2 className="text-xl mt-4 text-blue-300">Skills</h2>
          <p>{resume.skills}</p>
        </div>

        <div>
          <h2 className="text-xl mt-4 text-blue-300">Work Experience</h2>
          {resume.workExperiences.map((exp, i) => (
            <p key={i}>• {exp.value}</p>
          ))}
        </div>

        <div>
          <h2 className="text-xl mt-4 text-blue-300">Education</h2>
          {resume.education.map((edu, i) => (
            <p key={i}>🎓 {edu.value}</p>
          ))}
        </div>

        <Button
          className="mt-6 bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={enhanceWithAI}
        >
          Enhance with AI
        </Button>

        {enhancement && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg space-y-3">
            <h2 className="text-xl font-bold text-green-400">AI Review</h2>
            <p><strong>ATS Score:</strong> {enhancement.atsScore}/100</p>
            <div>
              <strong>Issues Found:</strong>
              <ul className="list-disc ml-6">
                {enhancement.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Suggestions:</strong>
              <ul className="list-disc ml-6">
                {enhancement.suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
