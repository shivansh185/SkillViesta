'use client';
import React, { useState } from 'react';

export default function QuizPage() {
  const [topic, setTopic] = useState('DSA');
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fetchQuiz = async () => {
    setSubmitted(false);
    const res = await fetch('/api/generateQuiz', {
      method: 'POST',
      body: JSON.stringify({ topic }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setQuiz(data.quiz || []);
    setAnswers({});
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      const selected = answers[idx];
      const correct = q.correct;
      if (selected === correct) score++;
    });
    return score;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Interview Quiz Generator</h1>

      <div className="flex gap-4 items-center">
        <label>Select Topic:</label>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className="border px-3 py-1 rounded">
          <option value="Development">Development</option>
          <option value="DSA">DSA</option>
        </select>
        <button onClick={fetchQuiz} className="bg-blue-500 text-white px-4 py-2 rounded">Generate Quiz</button>
      </div>

      {quiz.length > 0 && (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="space-y-6">
            {quiz.map((q, idx) => (
              <div key={idx} className="border p-4 rounded">
                <p className="font-semibold">{idx + 1}. {q.question}</p>
                {q.options.map((opt, optIdx) => {
                  const optionLetter = ['A', 'B', 'C', 'D'][optIdx];
                  return (
                    <label key={optIdx} className="block">
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={optionLetter}
                        disabled={submitted}
                        checked={answers[idx] === optionLetter}
                        onChange={() => setAnswers({ ...answers, [idx]: optionLetter })}
                      />
                      {' '}{optionLetter}. {opt}
                    </label>
                  );
                })}

                {submitted && (
                  <div className="mt-2">
                    {answers[idx] === q.correct ? (
                      <p className="text-green-600">✅ Correct</p>
                    ) : (
                      <div>
                        <p className="text-red-600">❌ Wrong (Correct: {q.correct})</p>
                        <p className="text-sm text-gray-700">Explanation: {q.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted && (
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Submit Quiz
            </button>
          )}
        </form>
      )}

      {submitted && (
        <p className="text-xl font-semibold text-blue-700 mt-4">
          🎯 You scored {getScore()} out of {quiz.length}
        </p>
      )}
    </div>
  );
}
