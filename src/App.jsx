import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quiz from './components/Quiz/Quiz'
import TechnicalQuizForm from './components/TechnicalQuizForm /TechnicalQuizForm '

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <TechnicalQuizForm /> */}
      <Quiz />
    </>
  )
}

export default App
