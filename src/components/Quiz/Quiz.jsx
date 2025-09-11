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

  const [isDark, setIsDark] = useState(() => {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });


  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const PASS_PERCENT = 0.6;
  const questions = [
    // {
    //   id: 1,
    //   text: 'What is the correct way to create a functional component in React?',
    //   options: [
    //     'function MyComponent() { return Hello; }',
    //     'const MyComponent = () => { return Hello; }',
    //     'class MyComponent extends React.Component { render() { return Hello; }}',
    //     'Both A and B are correct',
    //   ],
    //   correctAnswer: 'Both A and B are correct',
    //   technologies: ['React.js', 'Node.js'],
    // },
    {
      id: 1,
      text: 'What is the correct way to create a functional component in React?',
      options: [
        'function MyComponent() { return Hello; } lorem ipsum random text to overflow the option button   mkmfv',
        'const MyComponent = () => { return Hello; } random text to overflow the option button  mkmfv lorem ipsum random text to overflow the option button',
        'class MyComponent extends React.Component { render() { return Hello; }} random text to overflow the option button  mkmfv lorem ipsum random text to overflow the option button',
        'Both A and B are correct random text to overflow the option button  mkmfv lorem ipsum random text to overflow the option button',
        // 'Both c and d are correct random text to overflow the option button  mkmfv lorem ipsum random text to overflow the option button',
      ],
      correctAnswer: 'Both A and B are correct random text to overflow the option button  mkmfv lorem ipsum random text to overflow the option button',
      technologies: ['React.js', 'Node.js'],
    },
    {
      id: 2,
      text: 'What is JSX in React?',
      options: [

        'A syntax extension for JavaScript',
        'A templating engine',
        'A library for managing state',
        'A CSS framework',
      ],
      correctAnswer: 'A syntax extension for JavaScript',
      technologies: ['React.js'],
    },
    {
      id: 3,
      text: 'Which hook is used to manage state in functional components?',
      options: ['useEffect', 'useState', 'useReducer', 'useContext'],
      correctAnswer: 'useState',
      technologies: ['React.js'],
    },
    {
      id: 4,
      text: 'What is the purpose of the virtual DOM in React?',
      options: [
        'To direcgsapy manipulate the DOM',
        'To improve performance by minimizing DOM updates',
        'To store application state',
        'To handle routing',
      ],
      correctAnswer: 'To improve performance by minimizing DOM updates',
      technologies: ['React.js'],
    },
    {
      id: 5,
      text: 'Which lifecycle method is used to fetch data in class components?',
      options: [
        'componentDidMount',
        'componentWillUnmount',
        'shouldComponentUpdate',
        'render',
      ],
      correctAnswer: 'componentDidMount',
      technologies: ['React.js'],
    },
    {
      id: 6,
      text: 'What is the default port for a Node.js application?',
      options: ['3000', '8080', '5000', '80'],
      correctAnswer: '3000',
      technologies: ['Node.js'],
    },
    {
      id: 7,
      text: 'Which module is used to create a server in Node.js?',
      options: ['http', 'fs', 'path', 'express'],
      correctAnswer: 'http',
      technologies: ['Node.js'],
    },
    {
      id: 8,
      text: "What is the purpose of the 'useEffect' hook in React?",
      options: [
        'To manage state',
        'To perform side effects like data fetching',
        'To handle routing',
        'To optimize performance',
      ],
      correctAnswer: 'To perform side effects like data fetching',
      technologies: ['React.js'],
    },
    {
      id: 9,
      text: 'Which JavaScript feature allows you to write asynchronous code?',
      options: ['Promises', 'Callbacks', 'Async/Await', 'All of the above'],
      correctAnswer: 'All of the above',
      technologies: ['JavaScript'],
    },
    {
      id: 10,
      text: "What is the purpose of the 'fs' module in Node.js?",
      options: [
        'To handle file system operations',
        'To create HTTP servers',
        'To manage routing',
        'To interact with databases',
      ],
      correctAnswer: 'To handle file system operations',
      technologies: ['Node.js'],
    },
    {
      id: 11,
      text: 'Which of the following is a Python framework for web development?',
      options: ['Django', 'Flask', 'FastAPI', 'All of the above'],
      correctAnswer: 'All of the above',
      technologies: ['Python'],
    },
    {
      id: 12,
      text: "What is the purpose of the 'useReducer' hook in React?",
      options: [
        'To manage complex state logic',
        'To fetch data',
        'To handle routing',
        'To optimize performance',
      ],
      correctAnswer: 'To manage complex state logic',
      technologies: ['React.js'],
    },
    {
      id: 13,
      text: 'Which of the following is a JavaScript framework?',
      options: ['React.js', 'Angular', 'Vue.js', 'All of the above'],
      correctAnswer: 'All of the above',
      technologies: ['JavaScript'],
    },
    {
      id: 14,
      text: "What is the purpose of the 'path' module in Node.js?",
      options: [
        'To handle file paths',
        'To create HTTP servers',
        'To manage routing',
        'To interact with databases',
      ],
      correctAnswer: 'To handle file paths',
      technologies: ['Node.js'],
    },
    {
      id: 15,
      text: 'Which of the following is a Java framework?',
      options: ['Spring', 'Hibernate', 'Struts', 'All of the above'],
      correctAnswer: 'All of the above',
      technologies: ['Java'],
    },
  ];
  

  useGSAP(() => {
    inAnimation(0);
  }, { dependencies: [], scope: containerRef });
  
  const inAnimation = (nextIndex) => {

    const optionButtons = gsap.utils.toArray('.option-button');

  
   
    gsap.set(optionButtons, { x: 0, opacity: 0 });    

  
    gsap.from('.question-header', {
      
      onComplete: () => {
        gsap.set('.question-header', { clearProps: 'all' });

        
        gsap.utils.toArray('.option-button').forEach((el, index) => {
         
          
          gsap.from(el, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.3, // this delay is now relative to header's finish
            ease: "power2.out",
            onComplete: () => {
              gsap.set(el, { clearProps: 'all' });
            }
          });
      
           
        });
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

    // Exit animation for header
    tl.to(".question-header", {
      y: dir > 0 ? 100 : -100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    // Exit animation for options (staggered)
    gsap.utils.toArray('.option-button').forEach((el, index) => {
      // console.log("Animating out option index:", index, el);
      tl.to(el, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2" + index * 0.3); // overlap timing a bit
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
