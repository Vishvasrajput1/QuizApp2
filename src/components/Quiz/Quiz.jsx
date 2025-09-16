import React, { useState, useRef } from 'react';
// import './QuizQuestion.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import 'animate.css';
import { set } from 'react-hook-form';
import { QuizHeader } from './QuizHeader';
import { QuizQuestion } from './QuizQuestion';
import { ResultPopUp } from './ResultPopUp';
import { ToggleThemeButton } from './ToggleThemeButton';
import { i } from 'framer-motion/client';
import { delay } from 'framer-motion';
import { questions } from '../../data/questions';
import { useTheme } from '../../context/ThemeContext';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerResults, setAnswerResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [didPass, setDidPass] = useState(false);
  const {isDark,toggleDarkMode} = useTheme()
  const PASS_PERCENT = 0.6;


  const goToQuestion = (dir) => {
    const nextIndex = currentQuestionIndex + dir;
    if (nextIndex < 0 || nextIndex >= questions.length) return;
    if (nextIndex === currentQuestionIndex) return;
    if (dir > 0 && selectedOption === null && answerResults[currentQuestionIndex] === undefined) return;
    setTimeout(()=>{
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
    },dir>0&&500)
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = option;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === questions[currentQuestionIndex].correctAnswer;
    if (currentQuestionIndex < questions.length - 1) {
      setAnswerResults((prev) => {
        const updated = [...prev];
        if (selectedOption !== null) {
          updated[currentQuestionIndex] = selectedOption === questions[currentQuestionIndex].correctAnswer;
        }
        return updated;

      });

      goToQuestion(1);
      // setCurrentQuestionIndex((prev) => prev + 1);
      // setSelectedOption(null);
    }
    if (currentQuestionIndex === questions.length - 1) {
      const final = [...answerResults];
      if (selectedOption !== null) final[currentQuestionIndex] = isCorrect;
      const score = final.filter(Boolean).length;
      setFinalScore(score);
      setDidPass(score >= Math.ceil(questions.length * PASS_PERCENT));
      setAnswerResults(final);
      setTimeout(() => {
        setShowResult(true);

      }, 800);
      return;
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOptions((prev) => {
        const updated = [...prev];
        if (answerResults[currentQuestionIndex] === undefined) {

          updated[currentQuestionIndex] = undefined;
        }
        return updated;
      });
      setSelectedOption(null);
      goToQuestion(-1);
     
      // Allow changing the answer when going back
      // setAnswerResults((prev) => {
      //     const updated = [...prev];
      //     updated[currentQuestionIndex] = undefined;
      //     return updated;
      // });

      // setSelectedOption(null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen  transition-colors duration-500 relative`}>
        <ToggleThemeButton isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <div
          className="min-h-screen flex flex-col justify-center items-center w-full px-4 sm:px-8 md:px-16 lg:px-[8rem] "
        >
          <div className="w-full">
            <QuizHeader
              isDark={isDark}
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
              answerResults={answerResults}
              selectedOption={selectedOption}
              goToQuestion={goToQuestion}
              selectedOptions={selectedOptions}
            />
            <QuizQuestion
              isDark={isDark}
              currentQuestion={currentQuestion}
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
              selectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
              handlePreviousQuestion={handlePreviousQuestion}
              handleNextQuestion={handleNextQuestion}
              selectedOptions={selectedOptions}
              answerResults={answerResults}
            />
          </div>
        </div>
        {showResult && (
          <ResultPopUp isDark={isDark} finalScore={finalScore} questions={questions} didPass={didPass} />
        )}
      </div>
    </>
  );
};

export default Quiz;
