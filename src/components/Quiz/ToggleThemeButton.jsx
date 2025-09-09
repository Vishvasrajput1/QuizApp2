import React from 'react'
import { Moon, Sun } from 'lucide-react';

export const ToggleThemeButton = ({
    isDark,
    toggleDarkMode
}) => {
  return (
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
  )
}
