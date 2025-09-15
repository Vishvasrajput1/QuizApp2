import React, { useEffect, useState } from 'react'
import {
  FaReact,
  FaNode,
  FaJs,
  FaPython,
  FaJava,
  FaAngular,
} from 'react-icons/fa'
import 'animate.css'
import { Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Controls } from './Controls'

export const QuizQuestion = ({
  isDark,
  questions,
  currentQuestion,
  currentQuestionIndex,
  selectedOption,
  handleOptionSelect,
  handlePreviousQuestion,
  handleNextQuestion,
  answerResults = [],
  selectedOptions,
}) => {
  const techIcons = {
    reactjs: <FaReact color="#007bff" size={20} />,
    nodejs: <FaNode color="#007bff" size={20} />,
    javascript: <FaJs color="#007bff" size={20} />,
    python: <FaPython color="#007bff" size={20} />,
    java: <FaJava color="#007bff" size={20} />,
    angular: <FaAngular color="#007bff" size={20} />,
  }
  const normalizeTech = tech =>
    tech.toLowerCase().replace('.', '').replace(' ', '').trim()

  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    // Reset selectedOption if user comes back to unanswered question
    if (
      answerResults[currentQuestionIndex] === undefined &&
      selectedOptions[currentQuestionIndex] === undefined &&
      selectedOption !== null
    ) {
      handleOptionSelect(null)
    }
    setAnimate(false)
    const timeout = setTimeout(() => setAnimate(true), 200)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [currentQuestionIndex])

  return (
    <div className="w-full mt-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
        >
          {/* Question Text */}
          <div className="mb-5 question-header">
            <h1
              key={currentQuestionIndex}
              className={`
                lg:text-3xl md:text-2xl text-lg flex-wrap font-bold leading-snug mb-2 min-h-[3.5rem] flex items-center transition-all duration-300 break-words 
            `}
            >
              {currentQuestion.text}
            </h1>

            {/* Technology Tags */}
            <div
              className={` 
                ${animate ? 'tracking-in-contract' : ''} 
                flex flex-row items-center gap-2 mt-2 mb-2 cursor-pointer flex-wrap`}
            >
              {currentQuestion.technologies?.map((tech, index) => {
                const normalizedTech = normalizeTech(tech)
                return (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 rounded-lg px-2 py-1 hover:bg-blue-200 transition"
                  >
                    <span className="mr-1">
                      {techIcons[normalizedTech] || ''}
                    </span>
                    <label className="text-blue-700 text-sm">{tech}</label>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Options Row-wise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[3rem] gap-y-[3rem] pt-2 items-stretch auto-rows-fr">
            <AnimatePresence>
              {currentQuestion.options.map((option, index) => {
                const rowIndex = Math.floor(index / 2)

                return (
                  <motion.div
                    key={option}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      delay: 0.8 + rowIndex * 0.2,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full h-full"
                  >
                    <label
                      className={`
                        flex md:flex-row flex-col items-start md:items-center gap-3 px-4 py-4 whitespace-pre-wrap rounded-xl border-2 cursor-pointer w-full h-full min-w-0 min-h-[4rem]
                        ${isDark ? 'border-gray-800' : 'border-gray-300'}
                        ${
                          selectedOption === option ||
                          selectedOptions[currentQuestionIndex] === option
                            ? isDark
                              ? 'bg-blue-500 border-blue-800 shadow'
                              : 'bg-blue-200 border-blue-400 shadow'
                            : ''
                        }
                        hover:border-blue-500 hover:shadow transition option-button
                        ${
                          answerResults[currentQuestionIndex] !== undefined
                            ? option === currentQuestion.correctAnswer
                              ? isDark
                                ? 'bg-green-500 border-green-800 text-white'
                                : 'bg-green-200 border-green-400 text-black'
                              : selectedOptions[currentQuestionIndex] === option
                              ? isDark
                                ? 'bg-red-400 border-red-800 text-white'
                                : 'bg-red-200 border-red-400 text-black'
                              : ''
                            : ''
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={option}
                        disabled={
                          answerResults[currentQuestionIndex] !== undefined
                        }
                        checked={
                          selectedOption === option ||
                          selectedOptions[currentQuestionIndex] === option
                        }
                        onChange={() => handleOptionSelect(option)}
                        name={`option-${currentQuestionIndex}`}
                        className="hidden"
                      />

                      <span
                        className={`
                          min-w-[1rem] min-h-[1rem] 
                          flex-shrink-0 relative mt-1 md:mt-0 flex items-center justify-center rounded-full
                          ${
                            answerResults[currentQuestionIndex] !== undefined
                              ? option === currentQuestion.correctAnswer
                                ? `bg-transparent`
                                : selectedOptions[currentQuestionIndex] ===
                                  option
                                ? 'bg-transparent'
                                : 'bg-transparent'
                              : selectedOption === option ||
                                selectedOptions[currentQuestionIndex] === option
                              ? 'bg-blue-500 border-2 border-blue-500'
                              : 'border-2 border-blue-500'
                          }
                        `}
                      >
                        {answerResults[currentQuestionIndex] === undefined &&
                          (selectedOption === option ||
                            selectedOptions[currentQuestionIndex] ===
                              option) && (
                            <span className="w-2 h-2 rounded-full bg-white"></span>
                          )}

                        {answerResults[currentQuestionIndex] !== undefined &&
                          (option === currentQuestion.correctAnswer ? (
                            <Check
                              size={24}
                              absoluteStrokeWidth
                              className={`${
                                isDark ? 'text-white' : 'text-black'
                              }`}
                            />
                          ) : selectedOptions[currentQuestionIndex] ===
                            option ? (
                            <X
                              absoluteStrokeWidth
                              size={24}
                              className={`${
                                isDark ? 'text-white' : 'text-black'
                              }`}
                            />
                          ) : null)}
                      </span>
                      <span className="text-base pl-2 pr-3 break-words whitespace-normal w-full block option-text">
                        {option}
                      </span>
                    </label>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

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
