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
import {animateProgressPulse,animateQuestionEntry,animateQuestionExit} from '../../utils/quizAnimations'


gsap.registerPlugin(useGSAP);


const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextClicked, setNextClicked] = useState(false);
  const [previousClicked, setPreviousClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerResults, setAnswerResults] = useState([]);
  const progressRefs = useRef([]);
  const containerRef = useRef();

  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [didPass, setDidPass] = useState(false);

  const {isDark,toggleDarkMode} = useTheme()

  const PASS_PERCENT = 0.6;

  useGSAP(() => {
    inAnimation(0);
  }, { dependencies: [], scope: containerRef });
  
  const inAnimation = (nextIndex) => {

    // const optionButtons = gsap.utils.toArray('.option-button');

  
   
    // gsap.set(optionButtons, { x: 0, opacity: 0 });    

  
    gsap.from('.question-header', {
      
      onComplete: () => {
        gsap.set('.question-header', { clearProps: 'all' });
       
         const optionButtons = gsap.utils.toArray('.option-button')
         const tl = gsap.timeline({
           defaults: { ease: 'back.out(1.7)', duration: 0.6 },
         })

         // Step 1: Group buttons into rows dynamically
         // Example: first 2 are row 0, next 2 are row 1 (adjust as needed)
         const buttonsPerRow = 2 // change this if each row has different count
         const rowGroups = []

         for (let i = 0; i < optionButtons.length; i += buttonsPerRow) {
           rowGroups.push(optionButtons.slice(i, i + buttonsPerRow))
         }

         

         // Step 2: Animate each row with overlap
         rowGroups.forEach((row, rowIndex) => {
           tl.from(
             row,
             {
               y: 100,
               opacity: 0,
               autoAlpha: 0,
               stagger: 0.3,
               onComplete: () => gsap.set(row, { clearProps: 'all' }),
             },
             rowIndex === 0 ? 0 : `>-${0.1}`
           )
         })


        
        // gsap.utils.toArray('.option-button').forEach((el, index) => {

        //     const row = index === 0 || index === 1 ? 0 : 1


        //   gsap.from(el, {
        //     // x: index % 2 === 0 ? -100 : 100,
        //     y:100,
        //     opacity: 0,
        //      delay: 0.4 + row * 0.4,
        //     duration: 0.8,
        //     autoAlpha: 0, 
        //     ease: "back.out(1.7)",
        //     onComplete: () => {
        //       gsap.set(el, { clearProps: 'all' });
        //     }
        //   });
      
           
        // });
      }
    });
  };



  const goToQuestion = (dir) => {
    
    const nextIndex = currentQuestionIndex + dir;
    if (nextIndex < 0 || nextIndex >= questions.length) return;
    if (nextIndex === currentQuestionIndex) return;
    if (dir > 0 && selectedOption === null && answerResults[currentQuestionIndex] === undefined) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // After exit animations finish → update state → trigger entry
        setCurrentQuestionIndex(nextIndex);
        setSelectedOption(null);
        //  gsap.set('.option-button', { clearProps: 'all' });
        //  gsap.set('.question-header', { clearProps: 'all' });
        //  inAnimation(nextIndex);
        // Give React time to re-render, then trigger entry animation
        requestAnimationFrame(() => inAnimation(nextIndex));
      }
    });
      
    // tl.addPause(0.01)
    // Exit animation for header
    tl.to(".question-header", {
      // y: dir > 0 ? 100 : -100,
      y:100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Exit animation for options (staggered)
    gsap.utils.toArray('.option-button').forEach((el, index) => {
      // console.log("Animating out option index:", index, el);
      tl.to(el, {
        opacity: 0,
        // x: index % 2 === 0 ? -100 : 100,
        y:100,
        
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.1" + index * 0.2); // overlap timing a bit
    });
    // tl.to({}, { duration: 0.1});
  };

  useGSAP(
    () => {
      // if (selectedOption === null && answerResults[currentQuestionIndex] === undefined && nextClicked) {
      //   console.log("no option selected, so not animating");
      //   const el = progressRefs.current[currentQuestionIndex];
      //   if (el) {
      //     gsap.fromTo(
      //       el,
      //       { scale: 1 },
      //       {
      //         scale: 1.2,
      //         duration: 0.4,
      //         ease: "power2.inOut", // smooth transition
      //         yoyo: true,
      //         repeat: 1,
      //         onComplete: () =>
      //           gsap.to(el, { scale: 1, duration: 0.2, ease: "power1.out" }),
      //       }
      //     );
      //   }

      // }
    
      if ((nextClicked) && selectedOption !== null) {


        setNextClicked(false);
        setSelectedOption(null);
        const el = progressRefs.current[currentQuestionIndex];
        if (el) {
          const isCorrect =
            selectedOption === questions[currentQuestionIndex].correctAnswer;

          const color = isCorrect ? "#4caf50" : "#f44336";

          gsap.fromTo(
            el,
            { scale: 1, backgroundColor: "#ccc", color: "#000" }, // start colors (optional)
            {
              scale: 1.2,
              backgroundColor: color,
              color: "#fff",
              duration: 0.4,
              ease: "power2.inOut", // smooth transition
              yoyo: true,
              repeat: 1,
              onComplete: () =>
                gsap.to(el, {
                  scale: 1,
                  backgroundColor: color,
                  color: "#fff",
                  duration: 0.3,
                  ease: "power1.out", // ease back to normal smoothly
                }),
            }
          );
        }
      }

      if (nextClicked || previousClicked) {

        const el = progressRefs.current[currentQuestionIndex];
        if (el) {
          gsap.fromTo(
            el,
            { scale: 1 },
            {
              scale: 1.2,
              duration: 0.4,
              ease: "power2.inOut", // smooth transition
              yoyo: true,
              repeat: 1,
              onComplete: () =>
                gsap.to(el, { scale: 1, duration: 0.2, ease: "power1.out" }),
            }
          );
        }

      }

    },
    { dependencies: [nextClicked, previousClicked, currentQuestionIndex, selectedOption], scope: containerRef }
  );




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

      setNextClicked(true);
      setTimeout(() => setNextClicked(false), 500);

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
      setPreviousClicked(true);
      setTimeout(() => setPreviousClicked(false), 500);
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

  // Run animation once on first question load
  



  return (
    <>
      <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} min-h-screen  transition-colors duration-500 relative`}>
        <ToggleThemeButton isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <div
          className="min-h-screen flex flex-col justify-center items-center w-full px-4 sm:px-8 md:px-16 lg:px-[8rem] "
          ref={containerRef}
        >
          <div className="w-full">
            <QuizHeader
              isDark={isDark}
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
              progressRefs={progressRefs}
              answerResults={answerResults}
              setNextClicked={setNextClicked}
              selectedOption={selectedOption}
              goToQuestion={goToQuestion}
              selectedOptions={selectedOptions}
              setPreviousClicked={setPreviousClicked}
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
              previousClicked={previousClicked}
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
