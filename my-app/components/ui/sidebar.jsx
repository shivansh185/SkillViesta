import React from 'react';
import PropTypes from 'prop-types';

export default function Sidebar({ answers, currentIndex, setCurrentIndex, questionsLength }) {
  // Adjust styles based on number of questions
  const isManyQuestions = questionsLength > 8;

  return (
    <div className="w-64 bg-[#0f172a] p-4 border-r border-zinc-800 h-screen sticky top-0 shadow-xl flex flex-col">
      <h2 className={text-xl font-bold mb-4 text-center text-white tracking-wide}>
        Answer Status
      </h2>

      {/* Scrollable list container */}
      <ul className={flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 ${isManyQuestions ? 'space-y-2' : 'space-y-4'}}>
        {answers.map((ans, idx) => (
          <li
            key={idx}
            className={`
              ${isManyQuestions ? 'text-xs px-2 py-2 rounded-lg' : 'text-sm px-4 py-3 rounded-xl'}
              cursor-pointer font-semibold tracking-wide text-center
              border-2 transition-all duration-200 shadow-md
              ${ans.trim()
                ? 'bg-green-500 border-green-600 text-white hover:bg-green-600'
                : 'bg-zinc-800 border-zinc-600 text-gray-300 hover:bg-zinc-700'}
              ${currentIndex === idx ? 'ring-2 ring-blue-400 scale-105' : ''}
            `}
            onClick={() => setCurrentIndex(idx)}
          >
            Q{idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  questionsLength: PropTypes.number.isRequired,
};