import React, { useState } from 'react';

const QuizSection = ({ quizData, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = selectedOption === quizData.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    if (onSubmit) onSubmit(correct);
  };

  return (
    <div className="mt-6 p-5 border border-gray-200 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{quizData.question}</h3>
      <div className="space-y-2">
        {quizData.options.map((option, idx) => (
          <label key={idx} className="block cursor-pointer">
            <input
              type="radio"
              name="quiz"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
              className="mr-2"
              disabled={isSubmitted}
            />
            {option}
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selectedOption || isSubmitted}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        Submit
      </button>
      {isSubmitted && (
        <div
          className={`mt-4 p-3 rounded-md font-medium ${
            isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {isCorrect ? 'Correct! 🎉' : `Incorrect. Try again.`}
        </div>
      )}
    </div>
  );
};

export default QuizSection;
