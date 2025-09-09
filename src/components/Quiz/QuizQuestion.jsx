import React from 'react'
import { FaReact, FaNode, FaJs, FaPython, FaJava, FaAngular } from "react-icons/fa";
import 'animate.css';

export const QuizQuestion = ({
  isDark,
  currentQuestion,
  currentQuestionIndex,
  questions,
  selectedOption,
  handleOptionSelect,
  handlePreviousQuestion,
  handleNextQuestion,
  selectedOptions,
  answerResults,
}) => {
  const techIcons = {
    reactjs: <FaReact color="#007bff" size={20} />,
    nodejs: <FaNode color="#007bff" size={20} />,
    javascript: <FaJs color="#007bff" size={20} />,
    python: <FaPython color="#007bff" size={20} />,
    java: <FaJava color="#007bff" size={20} />,
    angular: <FaAngular color="#007bff" size={20} />
  };
  const normalizeTech = (tech) => tech.toLowerCase().replace('.', '').replace(' ', '').trim();
  return (

    <div className={` rounded-lg  p-5 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="mb-5 question-header">
        <h2
          className="
    text-lg
    md:text-xl
    font-bold
    leading-snug
    mb-2
    min-h-[3.5rem]   
    flex
    items-center
    transition-all
    duration-300
    break-words
  "
        >
          {currentQuestion.text}
        </h2>
        <div className="flex flex-row items-center gap-2 mt-2 mb-2 cursor-pointer flex-wrap">
          {currentQuestion.technologies?.map((tech, index) => {
            const normalizedTech = normalizeTech(tech);
            return (
              <div key={index} className="flex items-center bg-blue-100 rounded-lg px-2 py-1 hover:bg-blue-200 transition">
                <span className="mr-1">{techIcons[normalizedTech] || ''}</span>
                <label className="text-blue-700 text-sm">{tech}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-2">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className={`
                                flex items-center gap-5 px-4 py-3 rounded-md ${isDark ? 'border-2 border-gray-900' : 'border-2 border-gray-300'} cursor-pointer 
                                ${(selectedOption === option || selectedOptions[currentQuestionIndex] === option) ? isDark ? 'bg-blue-500 bordr-blue-800 shadow' : 'bg-blue-200 border-blue-400 shadow' : ''}
                                hover:border-blue-500 hover:shadow
                                option-button
                            `}
          >
            <input
              type="radio"
              value={option}
              disabled={answerResults[currentQuestionIndex] !== undefined}
              checked={selectedOption === option || selectedOptions[currentQuestionIndex] === option}
              onChange={() => handleOptionSelect(option)}
              name={`option-${currentQuestionIndex}`}
              className="hidden"
            />
            <span className={`
                                w-4 h-4 min-w-[1rem] min-h-[1rem] max-w-[1rem] max-h-[1rem] rounded-full border-2 border-blue-500  flex-shrink-0 relative
                                
                                ${selectedOption === option || selectedOptions[currentQuestionIndex] === option ? 'bg-blue-500 shadow-inner' : ''}
                                ${selectedOption === option || selectedOptions[currentQuestionIndex] === option ? 'after:content-[""] after:block after:w-2 after:h-2 after:rounded-full after:bg-white after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' : ''}
                                custom-radio
                            `}></span>
            <span className="text-base pl-2 option-text">{option}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow cursor-pointer transition hover:to-blue-500 hover:-translate-y-0.1 hover:scale-101 disabled:to-blue-400 disabled:text-white disabled:cursor-not-allowed"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow transition cursor-pointer hover:to-blue-500 hover:-translate-y-0.1 hover:scale-101"
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}
