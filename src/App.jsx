import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quiz from './components/Quiz/Quiz'
import TechnicalQuizForm from './components/TechnicalQuizForm /TechnicalQuizForm '
import { ThemeProvider } from './context/ThemeContext'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ThemeProvider >
     <TechnicalQuizForm />
      <Quiz />
      </ThemeProvider>
    </>
  )
}

export default App
