import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuizQuestion from './components/Quiz/QuizQuestion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuizQuestion />
    </>
  )
}

export default App
