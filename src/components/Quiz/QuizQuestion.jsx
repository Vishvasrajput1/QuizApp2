import React, { useState, useRef } from 'react';
// import './QuizQuestion.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaReact, FaNode, FaJs, FaPython, FaJava, FaAngular } from "react-icons/fa";
import 'animate.css';
import { set } from 'react-hook-form';
import { Moon, Sun } from 'lucide-react';


gsap.registerPlugin(useGSAP);
const darkMode = false; // Set to true for dark mode
const QuizQuestion = () => {
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

    const techIcons = {
        reactjs: <FaReact color="#007bff" size={20} />,
        nodejs: <FaNode color="#007bff" size={20} />,
        javascript: <FaJs color="#007bff" size={20} />,
        python: <FaPython color="#007bff" size={20} />,
        java: <FaJava color="#007bff" size={20} />,
        angular: <FaAngular color="#007bff" size={20} />
    };

    const inAnimation = () => {


        gsap.from('.option-button', {
            x: 100,
            opacity: 0,
            duration: 0.6,
            delay: 0.6,
            stagger: 0.1,
            // stagger: {
            //     each: 0.1,      // delay between each element
            //     from: "start",  // start, end, center, edges, random
            //     ease: "power1.inOut", // easing for stagger timing
            //     amount: 1       // total time for all staggers combined
            // },
            ease: "power2.out",
            onComplete: () => {
                gsap.set('.option-button', { clearProps: 'all' }); // Clear inline styles after animation          
            }
        })
        // gsap.to('.option-button', {
        //     x: -100,
        //     opacity: 0,
        //     duration: 0.6,
        //     delay: 0.3,
        //     stagger: {
        //         each: 0.1,      // delay between each element
        //         from: "start",  // start, end, center, edges, random
        //         ease: "power1.inOut", // easing for stagger timing
        //         amount: 1       // total time for all staggers combined
        //     },
        // ease: "power2.out"
        // })

        // gsap.from('.progress-circle', {
        //     scale: 0,
        //     opacity: 0,
        //     duration: 0.5,
        //     stagger: 0.1,
        //     ease: "back.out(1.7)"
        // }); 
        gsap.from('.question-header', {
            y: -50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                gsap.set('.question-header', { clearProps: 'all' }); // Clear inline styles after animation
            }
        });
        // gsap.to('.question-header', {
        //     y: 50,
        //     opacity: 0,
        //     duration: 0.6,
        //     ease: "power2.out"
        // });
    }
    const goToQuestion = (dir) => {
        // Animate OUT first, THEN update state
        const nextIndex = currentQuestionIndex + dir;
        gsap.to(".question-header, .option-button", {
            y: dir > 0 ? 100 : -100,
            opacity: 0,
            duration: 0.4,
            delay: 0.6,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                gsap.set(".question-header, .option-button", { clearProps: 'all' }); // Clear inline styles after animation
                if (dir === 1 && selectedOption !== null) {
                    setSelectedOption(null);
                }
                // Clamp the index between 0 and questions.length - 1
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
    const normalizeTech = (tech) => tech.toLowerCase().replace('.', '').replace(' ', '').trim();

    return (
        <>
            <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen transition-colors duration-500 relative`}>
                <div className='absolute top-5 right-5 '>

                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-lg transition-colors duration-200 ${isDark
                            ? 'bg-gray-700 hover:bg-gray-600 text-white shadow(10px 10px 20px rgba(250, 247, 247))'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? (
                            <Sun className="w-5 h-5 text-white" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-700" />
                        )}
                    </button>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-auto p-5 font-sans" ref={containerRef}>
                    <div className={` rounded-lg p-5 mb-5 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        <div className="flex justify-between mb-2">
                            <h3 className="font-semibold text-lg">Question Progress</h3>
                            <p className={`${isDark ? 'text-gray-200' : 'text-gray-600'}`}>{currentQuestionIndex + 1} of {questions.length}</p>
                        </div>
                        <div className="flex mt-4 justify-center items-center cursor-pointer">
                            {questions.map((_, index) => (
                                <div
                                    key={index}
                                    ref={el => (progressRefs.current[index] = el)}
                                    className={`
                                w-8 h-8 rounded-full flex items-center justify-center mx-1 font-bold text-sm
                                transition-all duration-100 hover:border-2 hover:border-blue-500
                                ${index === currentQuestionIndex
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-800 text-white scale-110 shadow-lg'
                                            : answerResults[index] === true
                                                ? 'bg-green-500 text-white'
                                                : answerResults[index] === false
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-200 text-gray-700'
                                        }
                                hover:shadow-xl
                            `}
                                    onClick={() => {
                                        if (index !== currentQuestionIndex) {
                                            setNextClicked(true);
                                            setTimeout(() => setNextClicked(false), 500);
                                            setAnswerResults((prev) => {
                                                const updated = [...prev];
                                                if (selectedOption !== null) {
                                                    updated[currentQuestionIndex] = selectedOption === questions[currentQuestionIndex].correctAnswer;
                                                }
                                                return updated;
                                            });
                                            goToQuestion(index - currentQuestionIndex);
                                        }
                                    }}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={` rounded-lg p-5 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        <div className="mb-5 question-header">
                            <h2 className="text-xl font-bold">{currentQuestion.text}</h2>
                            <div className="flex flex-row items-center gap-2 mt-2 mb-2">
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
                                flex items-center gap-5 px-4 py-3 rounded-md border ${isDark?'':'border-gray-200'} cursor-pointer 
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
                                className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow transition hover:from-pink-500 hover:to-red-700 hover:-translate-y-0.5 hover:scale-105 disabled:from-gray-200 disabled:to-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow transition hover:from-pink-500 hover:to-red-700 hover:-translate-y-0.5 hover:scale-105"
                                onClick={handleNextQuestion}
                            >
                                {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </div>

                </div>
                {showResult && (
                    <div className={`fixed inset-0  flex items-center justify-center z-50 ${isDark ? 'bg-gray-900 bg-opacity-90 text-white' : 'bg-gray-100 bg-opacity-90 text-gray-900'}`}>
                        <div className={` p-8 rounded-2xl text-center animate-zoomIn ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg max-w-md mx-4`}>
                            {didPass ? (
                                <div>
                                    <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Congratulations! You Passed 🎉</h2>
                                    <p className="mb-2">Your Score: {finalScore}/{questions.length}</p>
                                    <p className="text-gray-500">Flowers & crackers launched with GSAP!</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold text-red-600 mb-2">😢 Better Luck Next Time</h2>
                                    <p className="mb-2">Your Score: {finalScore}/{questions.length}</p>
                                    <p className="text-gray-500">Tears animation by GSAP.</p>
                                </div>
                            )}
                            <div className="mt-4">
                                <button onClick={() => window.location.reload()} className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow transition hover:from-pink-500 hover:to-red-700 hover:-translate-y-0.5 hover:scale-105">
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default QuizQuestion;
