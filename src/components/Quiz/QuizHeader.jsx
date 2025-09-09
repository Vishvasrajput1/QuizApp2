import React from 'react'

export const QuizHeader = ({
    isDark,
    currentQuestionIndex,
    questions,
    progressRefs,
    answerResults,
    setNextClicked,
    selectedOption,
    goToQuestion  ,
    setAnswerResults
}) => {
  return (
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

  )
}
