import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaReact,
  FaNode,
  FaJs,
  FaPython,
  FaJava,
  FaAngular,
} from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'
import axios from 'axios'
import axiosClient from '../../api/axiosClient'
import { form } from 'framer-motion/client'



const TechnicalQuizForm = ({ onTechnologySelect }) => {
  const [technologies, setTechnologies] = useState([])
  const [selectedTechIndexes, setSelectedTechIndexes] = useState([])
  const [selectedTechs, setSelectedTechs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      yearsOfExperience: '0-1 Years',
      firstName: '',
      lastName: '',
      hrPersonName: '',
      technologies: [],
    },
  })

  const { isDark } = useTheme()

  useEffect(() => {
    const fetchTechnologies = async () => {
      const API_URL = 'https://e158c9c83f81.ngrok-free.app/v1/technologies'
      try {
        setLoading(true)
        const { data } = await axios.get(
          `https://cors-anywhere.herokuapp.com/${API_URL}`,
          {
            headers: {
              Accept: 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
        console.log('Fetched Technologies:', data.data)

        // Check if data is an object and has a 'technologies' property which is an array
        if (
          data &&
          typeof data === 'object' 
        ) {
          
          setTechnologies(data.data.results)
        } else {
          // Handle the case where the data is not in the expected format
          console.error(
            'API response data is not in the expected format:',
            data
          )
          setTechnologies([]) // Set technologies to an empty array or handle as appropriate
        }
      } catch (error) {
        console.error('Error fetching technologies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTechnologies()
  }, [])

  const formValues = watch()

  const techIcons = {
    'Node js': <FaNode color="#8CC84B" size={20} />,
    'React JS': <FaReact color="#61DBFB" size={20} />,
    Javascript: <FaJs color="#F7DF1E" size={20} />,
    Python: <FaPython color="#3776AB" size={20} />,
    Java: <FaJava color="#007396" size={20} />,
    Angular: <FaAngular color="#DD0031" size={20} />,
  }

   const handleAddTechnology = e => {
    console.log('handleAddTechnology called', e.target.value)
    
     const techId = e.target.value
     if (!techId) return
     const tech = technologies.find(t => t.id === techId)
     
     if (tech && !selectedTechs.some(t => t.id === techId)) {
       setSelectedTechs([...selectedTechs, { ...tech, level: 1, selected: true }])
     }
     e.target.value = '' // reset dropdown
   }

   const handleRemoveTechnology = id => {
     setSelectedTechs(selectedTechs.filter(t => t.id !== id))
   }
  const handleStartQuiz = data => {
    const selectedTech = data.technologies
      .filter(t => t.selected)
      .map(({ technology, level }) => ({
        technology,
        level: Number(level),
      }))

    const payload = {
      email: data.email,
      yearsOfExperience: data.yearsOfExperience,
      firstName: data.firstName,
      lastName: data.lastName,
      hrPersonName: data.hrPersonName,
      technologies: selectedTechs.map(t => ({
        technology: t.id,
        level: Number(t.level),
      })),
    }

    console.log('Final Payload:', payload)
    alert('Payload ready! Check console for data.')
  }

  return (
    <div
      className={`min-h-screen py-8 px-4 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div
          className={`rounded-lg p-8 shadow-md border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-blue-600 text-xl font-mono">&lt;/&gt;</span>
              <h1
                className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Technical Quiz Portal
              </h1>
            </div>
            <p
              className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Please fill in your details to start the assessment
            </p>
          </div>
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(handleStartQuiz)}
            >
              {/* Email & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    className={`text-sm font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={`w-full px-3 py-2 rounded-md border outline-none transition ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                        : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                    }`}
                    {...register('email', {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 mt-1">
                      Please enter a valid email address.
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className={`text-sm font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-md border outline-none transition ${
                      isDark
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

              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    className={`text-sm font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 rounded-md border outline-none transition ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                        : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                    }`}
                    {...register('firstName', { required: true })}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <span className="text-xs text-red-500 mt-1">
                      First name is required.
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className={`text-sm font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 rounded-md border outline-none transition ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                        : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                    }`}
                    {...register('lastName', { required: true })}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <span className="text-xs text-red-500 mt-1">
                      Last name is required.
                    </span>
                  )}
                </div>
              </div>

              {/* HR Person Name */}
              <div className="flex flex-col gap-2">
                <label
                  className={`text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  HR Person Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 rounded-md border outline-none transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                  }`}
                  {...register('hrPersonName', { required: true })}
                  placeholder="HR Person Name"
                />
                {errors.hrPersonName && (
                  <span className="text-xs text-red-500 mt-1">
                    HR Person name is required.
                  </span>
                )}
              </div>

              {/* Technology Dropdown + Cards */}
              <div className="flex flex-col gap-2">
                <label
                  className={`text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  Select Technologies & Expertise Level
                </label>

                <select
                  className={`w-full px-3 py-2 rounded-md border outline-none transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-900'
                  }`}
                  onChange={handleAddTechnology}
                >
                  <option value="">-- Select a Technology --</option>
                  {technologies.map((tech, index) =>
                    !selectedTechIndexes.includes(index) ? (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    ) : null
                  )}
                </select>

                <div className="flex flex-col gap-4 mt-3">
                  {selectedTechs.map((t, idx) => {
                    const techData = technologies.find(
                      item => item.id === t.id
                    )
                    if (!techData) return null
                    return (
                      <div
                        key={t.technology}
                        className={`rounded-lg border p-4 ${
                          isDark ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              value={t.id}
                              checked={t.selected}
                              {...register(`technologies.${t.id}.selected`)}
                              className={`w-4 h-4 rounded border ${
                                isDark
                                  ? 'border-gray-600 accent-blue-500'
                                  : 'border-gray-300 accent-blue-600'
                              }`}
                            />
                            <span className="text-xl">
                              {techIcons[techData.name]}
                            </span>
                            <span
                              className={`font-medium ${
                                isDark ? 'text-gray-100' : 'text-gray-900'
                              }`}
                            >
                              {techData.name}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="text-red-500 text-sm hover:underline"
                            onClick={() => handleRemoveTechnology(t.id)}
                          >
                            Remove
                          </button>
                        </div>

                        {t.selected && (
                          <div className="flex flex-col gap-2">
                            <span
                              className={`text-xs ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              Expertise Level
                            </span>
                            <input
                              type="range"
                              min={1}
                              max={3}
                              value={t.level}
                              onChange={e =>
                                setSelectedTechs(prev =>
                                  prev.map(item =>
                                    item.id === t.id
                                      ? { ...item, level: e.target.value }
                                      : item
                                  )
                                )
                              }
                              className="flex-1 h-2 rounded bg-gray-200 accent-blue-600"
                            />
                            <span className="text-center text-blue-600 font-medium">
                              {t.level == 1
                                ? 'Beginner'
                                : t.level == 2
                                ? 'Intermediate'
                                : 'Expert'}
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                ▶ Start Quiz
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default TechnicalQuizForm
