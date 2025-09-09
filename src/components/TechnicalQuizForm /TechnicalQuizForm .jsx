import React from 'react'
import { useForm } from 'react-hook-form'
import { FaReact, FaNode, FaJs, FaPython, FaJava, FaAngular } from "react-icons/fa"

const TechnicalQuizForm = ({ onTechnologySelect, isDark }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      yearsOfExperience: '0-1 Years',
      firstName: '',
      lastName: '',
      hrPersonName: '',
      technologies: {
        reactjs: { selected: false, level: 3 },
        nodejs: { selected: false, level: 3 },
        javascript: { selected: false, level: 3 },
        python: { selected: false, level: 3 },
        java: { selected: false, level: 3 },
        angular: { selected: false, level: 3 },
      }
    }
  })

  const handleStartQuiz = (data) => {
    localStorage.setItem('email', data.email)
    const selectedTechnologies = Object.entries(data.technologies)
      .filter(([_, value]) => value.selected)
      .map(([tech]) => tech)
    onTechnologySelect(selectedTechnologies)
    alert('Quiz started! Check console for form data.')
  }

  const techIcons = {
    reactjs: <FaReact color="#61DBFB" size={20} />,
    nodejs: <FaNode color="#8CC84B" size={20} />,
    javascript: <FaJs color="#F7DF1E" size={20} />,
    python: <FaPython color="#3776AB" size={20} />,
    java: <FaJava color="#007396" size={20} />,
    angular: <FaAngular color="#DD0031" size={20} />
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto">
        <div className={`rounded-lg p-8 shadow-md border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-blue-600 text-xl font-mono">&lt;/&gt;</span>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Technical Quiz Portal</h1>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Please fill in your details to start the assessment</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleStartQuiz)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 rounded-md border outline-none transition
                    ${isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                    }`}
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="text-xs text-red-500 mt-1">Please enter a valid email address.</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-3 py-2 rounded-md border outline-none transition
                    ${isDark
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-500'
                    }`}
                  {...register('yearsOfExperience', { required: true })}
                >
                  <option>0-1 Years</option>
                  <option>1-2 Years</option>
                  <option>2-3 Years</option>
                  <option>3-5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 rounded-md border outline-none transition
                    ${isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                    }`}
                  {...register('firstName', { required: true })}
                  placeholder="First Name"
                />
                {errors.firstName && <span className="text-xs text-red-500 mt-1">First name is required.</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 rounded-md border outline-none transition
                    ${isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                    }`}
                  {...register('lastName', { required: true })}
                  placeholder="Last Name"
                />
                {errors.lastName && <span className="text-xs text-red-500 mt-1">Last name is required.</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                HR Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-md border outline-none transition
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                  }`}
                {...register('hrPersonName', { required: true })}
                placeholder="HR Person Name"
              />
              {errors.hrPersonName && <span className="text-xs text-red-500 mt-1">HR Person name is required.</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Select Technologies & Expertise Level <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-4">
                {Object.entries(watch('technologies')).map(([tech, data]) => (
                  <div key={tech} className={`rounded-lg border p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <input
                        type="checkbox"
                        id={tech}
                        className={`w-4 h-4 rounded border ${isDark ? 'border-gray-600 accent-blue-500' : 'border-gray-300 accent-blue-600'}`}
                        {...register(`technologies.${tech}.selected`)}
                      />
                      <span className="text-xl">{techIcons[tech]}</span>
                      <label htmlFor={tech} className={`font-medium capitalize ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                        {tech === 'reactjs' ? 'React.js' : tech === 'nodejs' ? 'Node.js' : tech}
                      </label>
                    </div>
                    {data.selected && (
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Expertise Level</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Beginner</span>
                          <input
                            type="range"
                            min="1"
                            max="3"
                            className="flex-1 h-2 rounded bg-gray-200 accent-blue-600"
                            {...register(`technologies.${tech}.level`)}
                          />
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expert</span>
                        </div>
                        <span className="text-center text-blue-600 font-medium">
                          {data.level == 1 ? 'Beginner' : data.level == 2 ? 'Intermediate' : 'Expert'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <span>▶</span>
              Start Quiz
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          {/* Footer content if needed */}
        </div>
      </div>
    </div>
  )
}

export default TechnicalQuizForm