import React from 'react'

export const ResultPopUp = ({
    isDark,
    didPass,
    finalScore,
    questions 
}) => {
  return (
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
                                <button onClick={() => window.location.reload()} className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md shadow transition cursor-pointer  hover:to-blue-500 hover:-translate-y-0.1 hover:scale-101">
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
  )
}
