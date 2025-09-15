import React from 'react'
import 'animate.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {motion} from "framer-motion"
export const QuizHeader = ({
  isDark,
  currentQuestionIndex,
  questions,
  answerResults,
  selectedOption,
  goToQuestion,

}) => {
  const [animate, setAnimate] = React.useState(true);
  React.useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 200); // next tick
    return () => clearTimeout(timeout);
  }, [currentQuestionIndex]);
  const hanldeProgressClick = (index) => {
    if (index < currentQuestionIndex) {  
      goToQuestion(index - currentQuestionIndex);
    }
  }


  return (
    <div
      className={`w-full  mb-15  ${isDark ? 'text-white' : 'text-gray-900'}`}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg">Quiz</h3>
        <p className={`${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
          {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>
      <div className="flex mt-4 justify-center gap-[0.2rem] item-center cursor-pointer">
        {questions.map((_, index) => {
          const isActive = index === currentQuestionIndex
          const isCorrect = answerResults[index] === true
          const isWrong = answerResults[index] === false
       
          const bgColor = isActive
            ? '#2563eb' 
            : isCorrect
            ? '#4caf50' 
            : isWrong
            ? '#f44336' 
            : '#e5e7eb'

          const textColor = isActive || isCorrect || isWrong ? '#fff' : '#000'

          return (
            <motion.div
              key={index}
             
              className={`
                ${
                  animate && isActive
                    ? 'animate__animated animate__heartBeat'
                    : ''
                }
          lg:w-[2.5rem] lg:h-[2.5rem] md:w-[1.5rem] md:h-[1.5rem] w-[1rem] 
          flex-wrap rounded-full flex items-center justify-center mx-[0.2rem] 
          lg:font-bold lg:text-[1rem] text-[0.5rem] md:text-[0.9rem] md:font-medium
          hover:shadow-xl cursor-pointer
        `}
              onClick={() => hanldeProgressClick(index)}
              animate={{
                scale: isActive ? 1.2 : 1,
                backgroundColor: bgColor,
                color: textColor,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
                repeat: isActive && selectedOption !== null ? 1 : 0,
                repeatType: 'reverse',
              }}
              whileHover={{
                border: '2px solid #3b82f6', 
                backgroundColor: '#dbeafe',
                color: '#000',
                scale: 1.1,
              }}
            >
              {index + 1}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}