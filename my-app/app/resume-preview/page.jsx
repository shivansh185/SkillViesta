"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ResumePreview() {
  const [resume, setResume] = useState(null);
  const [enhancement, setEnhancement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      setResume(JSON.parse(storedData));
    }
  }, []);

  const enhanceWithAI = async () => {
    if (!resume) return;
    setLoading(true);
    setEnhancement(null);
    setError("");

    const formattedResume = `
Name: ${resume.name}
Email: ${resume.email}
Phone: ${resume.phone}
LinkedIn: ${resume.linkedIn}
Skills: ${resume.skills}

Work Experience:
${resume.workExperiences.map((exp) => `- ${exp.value}`).join("\n")}

Education:
${resume.education.map((edu) => `- ${edu.value}`).join("\n")}
`;

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: formattedResume }),
      });

      const data = await res.json();

      if (data.success) {
        const raw = data.result;

        const parsed = {
          atsScore: extractATSScore(raw),
          issues: extractList(raw, "Issues"),
          suggestions: extractList(raw, "Suggestions"),
        };

        setEnhancement(parsed);
      } else {
        setError("AI Error: " + data.error);
      }
    } catch (err) {
      setError("Network Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractATSScore = (text) => {
    const match = text.match(/ATS Score[:\-]?\s*(\d+)/i);
    return match ? parseInt(match[1]) : "N/A";
  };

  const extractList = (text, label) => {
    const section = text.split(new RegExp(`${label}[:\\n]`, "i"))[1];
    if (!section) return [];
    return section
      .split("\n")
      .map((line) => line.trim().replace(/^[-•*]\s*/, ""))
      .filter((line) => line && !line.match(/^(ATS Score|Suggestions|Issues)/i));
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
          disabled={loading}
        >
          {loading ? "Enhancing..." : "Enhance with AI"}
        </Button>

        {error && (
          <p className="mt-4 text-red-500 font-medium">⚠ {error}</p>
        )}

        {enhancement && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg space-y-3">
            <h2 className="text-xl font-bold text-green-400">AI Review</h2>
            <p><strong>ATS Score:</strong> {enhancement.atsScore}/100</p>

            <div>
              <strong>Issues Found:</strong>
              <ul className="list-disc ml-6">
                {enhancement.issues.length > 0 ? (
                  enhancement.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))
                ) : (
                  <li>✅ No major issues found</li>
                )}
              </ul>
            </div>

            <div>
              <strong>Suggestions:</strong>
              <ul className="list-disc ml-6">
                {enhancement.suggestions.length > 0 ? (
                  enhancement.suggestions.map((sug, i) => (
                    <li key={i}>{sug}</li>
                  ))
                ) : (
                  <li>✅ Looks great!</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
