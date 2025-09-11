import React from 'react'

export const Controls = ({
  isDark,
  currentQuestionIndex,
  questions,
  selectedOption,
  handlePreviousQuestion,
  handleNextQuestion,
  selectedOptions 
}) => {
  return (
    <div className="flex justify-between align-end  mt-16">
      <button
        className={`bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow cursor-pointer transition hover:to-blue-500 hover:-translate-y-0.1 hover:scale-101 
          ${isDark
            ? 'disabled:from-gray-500 disabled:to-gray-500 disabled:text-white'
            : 'disabled:from-gray-500 disabled:to-gray-500 disabled:text-white'
          }
          disabled:text-white disabled:cursor-not-allowed`}
        onClick={handlePreviousQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>
      <button
        className={`
            bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow transition cursor-pointer 
            hover:from-blue-600 hover:to-blue-500 hover:-translate-y-0.1 hover:scale-101 
            disabled:cursor-not-allowed
            ${isDark
            ? 'disabled:from-gray-500 disabled:to-gray-500 disabled:text-white'
            : 'disabled:from-gray-500 disabled:to-gray-500 disabled:text-white'
          }
          `}
        onClick={handleNextQuestion}
        disabled={selectedOption === null && selectedOptions[currentQuestionIndex] === undefined}
      >
        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  )
}
