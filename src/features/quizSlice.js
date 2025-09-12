import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentQuestionIndex: 0,
  selectedOptions: [],
  answerResults: [],
  finalScore: 0,
  didPass: false,
  showResult: false,
  isDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches|| false,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload
    },
    setSelectedOption: (state, action) => {
      state.selectedOptions[state.currentQuestionIndex] = action.payload
    },
    setAnswerResult: (state, action) => {
      state.answerResults[state.currentQuestionIndex] = action.payload
    },
    setFinalScore: (state, action) => {
      state.finalScore = action.payload
    },
    setDidPass: (state, action) => {
      state.didPass = action.payload
    },
    setShowResult: (state, action) => {
      state.showResult = action.payload
    },
    resetQuiz: state => {
      Object.assign(state, initialState)
    },
    setIsDark: (state, action) => {
      state.darkMode = action.payload
    },
  },
})

export const {
  setCurrentQuestionIndex,
  setSelectedOption,
  setAnswerResult,
  setFinalScore,
  setDidPass,
  setShowResult,
  resetQuiz,
  setDarkMode,
} = quizSlice.actions

export const quizReducer = quizSlice.reducer
