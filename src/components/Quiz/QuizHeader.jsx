import React from 'react'
import 'animate.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const QuizHeader = ({
  isDark,
  currentQuestionIndex,
  questions,
  progressRefs,
  answerResults,
  nextClicked,
  selectedOption,
  goToQuestion,
}) => {
  const [animate, setAnimate] = React.useState(true);
  React.useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 200); // next tick
    return () => clearTimeout(timeout);
  }, [currentQuestionIndex]);
  const hanldeProgressClick = () => {

    if (index < currentQuestionIndex) {
      setPreviousClicked(true);
      goToQuestion(index - currentQuestionIndex);
      setTimeout(() => setPreviousClicked(false), 500);
    }
  }


  return (
    <div className={`w-full  mb-15  ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg">Quiz</h3>
        <p className={`${isDark ? 'text-gray-200' : 'text-gray-600'}`}>{currentQuestionIndex + 1} of {questions.length}</p>
      </div>
      <div className="flex mt-4 justify-center gap-[0.1rem] item-center cursor-pointer">
        {questions.map((_, index) => (
          <div
            key={index}
            ref={el => (progressRefs.current[index] = el)}
            className={`
              w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center mx-[0.2rem] font-bold text-sm
              transition-all duration-100 hover:border-2 hover:border-blue-500 hover:bg-blue-100 hover:text-black
              ${index === currentQuestionIndex
                ? `bg-gradient-to-br from-blue-500 to-blue-800 text-white scale-110 shadow-lg  ${animate ? 'animate__heartBeat' : ''} `
                : answerResults[index] === true
                  ? 'bg-green-500 text-white'
                  : answerResults[index] === false
                    ? 'bg-red-500 text-white'
                    : ''
              }
              hover:shadow-xl
             ${selectedOption === null && nextClicked && index === currentQuestionIndex ? 'text-pink' : ''}
              `
            }
            onClick={hanldeProgressClick}

          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}