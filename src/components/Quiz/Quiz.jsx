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


gsap.registerPlugin(useGSAP);
const darkMode = false;
const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [nextClicked, setNextClicked] = useState(false);
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
        {
            id: 1,
            text: 'What is the correct way to create a functional component in React?',
            options: [
                'function MyComponent() { return Hello; }',
                'const MyComponent = () => { return Hello; }',
                'class MyComponent extends React.Component { render() { return Hello; }}',
                'Both A and B are correct',
            ],
            correctAnswer: 'Both A and B are correct',
            technologies: ['React.js', 'Node.js'],
        },
        {
            id: 2,
            text: 'What is JSX in React?',
            options: [
                'A syntax extension for JavaScript',
                'A templating engine nkwshhhhhhhhhhhhuuuuuuuuuu8u889u92-7ty7tggqwguygudvwuvvfuwv784kkkkkfkkkkkllalllalalal',
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
                'To directly manipulate the DOM',
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

   

    const inAnimation = () => {
        gsap.from('.option-button', {
            x: 100,
            
            opacity: 0,
            duration: 0.6,
            // delay: 0.4,
            stagger: 0.06,
           scrub: true,
            // stagger: {
            //     each: 0.03,      // delay between each element
            //     from: "start",  // start, end, center, edges, random
            //     ease: "power1.inOut", // easing for stagger timing
            //     amount: 1       // total time for all staggers combined
            // },
            ease: "power2.out",
            onComplete: () => {
                gsap.set('.option-button', { clearProps: 'all' });          
            }
        })
     
        gsap.from('.question-header', {
            y: -50,
            markers: true,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                gsap.set('.question-header', { clearProps: 'all' }); 
            }
        });
       
    }
    const goToQuestion = (dir) => {
  
        const nextIndex = currentQuestionIndex + dir;
        gsap.to(".question-header, .option-button", {
            y: dir > 0 ? 100 : -100,
            opacity: 0,
            duration: 0.4,
            delay: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(".question-header, .option-button", { clearProps: 'all' }); 
                if (dir === 1 && selectedOption !== null) {
                    setSelectedOption(null);
                }
                
                if (nextIndex >= 0 && nextIndex < questions.length) {
                    setCurrentQuestionIndex(nextIndex);
                }
                inAnimation();
            }
        });
    };

    useGSAP(
        () => {


            if (nextClicked && selectedOption !== null) {
                setNextClicked(false);
                setSelectedOption(null);
                const el = progressRefs.current[currentQuestionIndex];
                if (el) {
                    const isCorrect = selectedOption === questions[currentQuestionIndex].correctAnswer;

                    const color = isCorrect ? '#4caf50' : '#f44336';
                    gsap.fromTo(
                        el,
                        { scale: 1 },
                        {
                            scale: 1.2,
                            backgroundColor: color,
                            color: '#fff',
                            duration: 0.4,
                            yoyo: true,
                            repeat: 1,
                            onComplete: () => gsap.to(el, { scale: 1, backgroundColor: color, color: "#fff", duration: 0.2 })
                        }
                    );
                }
            }
            if (nextClicked) {
                const el = progressRefs.current[currentQuestionIndex];
                if (el) {
                    gsap.fromTo(el, { scale: 1 }, { scale: 1.2, duration: 0.4, yoyo: true, repeat: 1, onComplete: () => gsap.to(el, { scale: 1, duration: 0.2 }) });
                }
            }
        },
        { dependencies: [nextClicked, currentQuestionIndex], scope: containerRef }
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
            setShowResult(true);
            return;
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            // setCurrentQuestionIndex((prev) => prev - 1);
            goToQuestion(-1);
            // setSelectedOption(null);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    

    return (
        <>
            <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} min-h-screen transition-colors duration-500 relative`}>
               <ToggleThemeButton isDark={isDark} toggleDarkMode={toggleDarkMode}/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full   max-w-2xl mx-auto p-5 font-sans" ref={containerRef}>
                   <QuizHeader  isDark={isDark} currentQuestionIndex={currentQuestionIndex} questions={questions} progressRefs={progressRefs} answerResults={answerResults} setAnswerResults={setAnswerResults} setNextClicked={setNextClicked} selectedOption={selectedOption} goToQuestion={goToQuestion}/>
                  <QuizQuestion isDark={isDark} currentQuestion={currentQuestion} currentQuestionIndex={currentQuestionIndex} questions={questions} selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} handlePreviousQuestion={handlePreviousQuestion} handleNextQuestion={handleNextQuestion} selectedOptions={selectedOptions} answerResults={answerResults} />
                </div>
                {showResult && (
                   <ResultPopUp isDark={isDark} finalScore={finalScore} questions={questions} didPass={didPass}/>
                )}
            </div>
        </>
    );
};

export default Quiz;
