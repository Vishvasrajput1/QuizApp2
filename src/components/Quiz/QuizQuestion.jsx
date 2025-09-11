import React, { useEffect, useState } from 'react'
import { FaReact, FaNode, FaJs, FaPython, FaJava, FaAngular } from "react-icons/fa";
import 'animate.css';
import { X } from 'lucide-react'
import { pre } from 'framer-motion/client';
import { motion } from "framer-motion";
import { Controls } from './Controls';


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
  previousClicked,

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
  const [animate, setAnimate] = useState(true);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger animation for children
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  // If user goes back without submitting (clicking Next/Submit), uncheck the option
  useEffect(() => {
    // If there's no answer result for this question and no selectedOptions, clear selectedOption
    if (
      answerResults[currentQuestionIndex] === undefined &&
      selectedOptions[currentQuestionIndex] === undefined &&
      selectedOption !== null
    ) {
      handleOptionSelect(null);
    }
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 200); // next tick
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [currentQuestionIndex, previousClicked]);

  return (
    <div className="w-full mt-10">
      <div className="mb-5 question-header">
        <h1
          key={currentQuestionIndex}
          className={`
            ${animate ? '' : ''}  lg:text-3xl md:text-2xl text-lg flex-wrap font-bold leading-snug mb-2 min-h-[3.5rem] flex items-center transition-all duration-300 break-words
          `}              
        >

          {currentQuestion.text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-text-reveal"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              {/* Replace spaces with a non-breaking space to preserve word spacing */}
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[3rem] gap-y-[3rem]  pt-2">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className={`
              flex md:flex-row flex-col items-start md:items-center gap-3 px-4 py-4 whitespace-pre-wrap rounded-xl border-2 cursor-pointer w-full min-w-0
              ${isDark ? 'border-gray-800' : 'border-gray-300'}
              ${(selectedOption === option || selectedOptions[currentQuestionIndex] === option)
                ? isDark
                  ? 'bg-blue-500 border-blue-800 shadow'
                  : 'bg-blue-200 border-blue-400 shadow'
                : ''
              }
              hover:border-blue-500 hover:shadow
              transition
              option-button
              ${answerResults[currentQuestionIndex] !== undefined
                ? (option === currentQuestion.correctAnswer
                  ? (isDark ? 'bg-green-500 border-green-800 text-white' : 'bg-green-200 border-green-400 text-black')
                  : (selectedOptions[currentQuestionIndex] === option
                    ? (isDark ? 'bg-red-400 border-red-800 text-white' : 'bg-red-200 border-red-400 text-black')
                    : ''))
                : ''
              }
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
              w-4 h-4 min-w-[1rem] min-h-[1rem] max-w-[1rem] max-h-[1rem] rounded-full border-2 border-blue-500 flex-shrink-0 relative mt-1 md:mt-0
              ${selectedOption === option || selectedOptions[currentQuestionIndex] === option ? 'bg-blue-500 shadow-inner' : ''}
              ${selectedOption === option || selectedOptions[currentQuestionIndex] === option ? 'after:content-[""] after:block after:w-2 after:h-2 after:rounded-full after:bg-white after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' : ''}
              custom-radio
              ${answerResults[currentQuestionIndex] !== undefined && option === currentQuestion.correctAnswer ? (isDark ? 'bg-green-500 border-green-800 ' : 'bg-green-200 border-green-400 shadow-inner') : ''}
              ${answerResults[currentQuestionIndex] !== undefined && selectedOptions[currentQuestionIndex] === option && option !== currentQuestion.correctAnswer ? (isDark ? 'bg-red-400 border-red-800 shadow-inner after:bg-red-400' : 'bg-red-200 border-red-400 shadow-inner after:bg-rd-200') : ''}
            `}> </span>
            <span className="text-base pl-2 pr-3 break-words whitespace-normal w-full block option-text">{option}</span>
          </label>
        ))}
      </div>

      <Controls
        isDark={isDark}
        currentQuestionIndex={currentQuestionIndex}
        questions={questions}
        selectedOption={selectedOption}
        handlePreviousQuestion={handlePreviousQuestion}
        handleNextQuestion={handleNextQuestion}
        selectedOptions={selectedOptions}
      />
    </div>
  )
}
