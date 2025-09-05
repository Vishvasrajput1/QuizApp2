import React, { useState, useRef } from 'react';
import './QuizQuestion.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaReact, FaNode, FaJs, FaPython, FaJava, FaAngular } from "react-icons/fa";
import 'animate.css';

gsap.registerPlugin(useGSAP);

const QuizQuestion = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [nextClicked, setNextClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [answerResults, setAnswerResults] = useState([]);
    const progressRefs = useRef([]);
    const containerRef = useRef();

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
            technologies: ['React.js','Node.js'],
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
                            onComplete: () => {
                                gsap.to(el, { scale: 1, backgroundColor: color, color: "#fff", duration: 0.2 });
                            },
                        }
                    );
                }
            }
            if(nextClicked){
                const el = progressRefs.current[currentQuestionIndex];
                if (el) {
                  
                    gsap.fromTo(
                        el,
                        { scale: 1 },
                        {
                            scale: 1.2,
                            // backgroundColor: color,
                            // color: '#fff',
                            duration: 0.4,
                            yoyo: true,
                            repeat: 1,
                            onComplete: () => {
                                gsap.to(el, { scale: 1, duration: 0.2 });
                            },
                        }
                    );
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
        <div className="quiz-container" ref={containerRef}>
            <div className="question-progress">
                <div className="question-progress-text-div">
                    <h3>Question Progress</h3>
                    <p>{currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <div className="progress-circle-div">
                    {questions.map((_, index) => (
                        <div
                            key={index}
                            ref={el => (progressRefs.current[index] = el)}
                            className={`progress-circle ${index === currentQuestionIndex ? 'active animate__pulse animate__backInRight' : ''}`}
                            // style={{
                            //     backgroundColor:
                            //         answerResults[index] === true
                            //             ? '#4caf50'
                            //             : answerResults[index] === false
                            //                 ? '#f44336'
                            //                 : '',
                            //     transition: 'background-color 0.5s',
                            // }}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            <div className="question-card">
                <div className={`question-header animate__backOutDown`}>
                    {/* {console.log(`question-header-${currentQuestionIndex}`);
                    } */}
                    <h2>{currentQuestion.text}</h2>
                    <div className="technologies-wrapper"> 

                    {currentQuestion.technologies?.map((tech, index) => {
                        const normalizedTech = normalizeTech(tech);
                        return (
                            <div key={index} className="technology-item">
                                <span className="technology-badge">
                                    {techIcons[normalizedTech] || ''}
                                </span>
                                <label className="technology-label">{tech}</label>
                            </div>
                        );
                    })}
                    </div>
                </div>

                <div className="options">
                    {currentQuestion.options.map((option, index) => (
                    
                        <label
                            key={index}
                            className={`option-button  ${selectedOption === option ? 'selected' : ''}`}
                        >
                            <input
                                type="radio"
                                value={option}
                                disabled={answerResults[currentQuestionIndex] !== undefined}
                                checked={selectedOption === option || selectedOptions[currentQuestionIndex] === option}
                                onChange={() => handleOptionSelect(option)}
                                name={`option-${currentQuestionIndex}`}
                            />
                            <span className="custom-radio"></span>
                            <span className="option-text animate__backInRight animate__backOutDown">{option}</span>
                        </label>
                    ))}
                </div>

                <div className="navigation">
                    <button
                        className="nav-button previous"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="nav-button next"
                        onClick={handleNextQuestion}
                    // disabled={currentQuestionIndex === questions.length - 1}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'submit' : 'Next'}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default QuizQuestion;
