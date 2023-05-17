import { useState } from 'react'
import './App.css'
import { UserInfo } from './components/UserInfo/UserInfo'

function App() {
  const [count, setCount] = useState(0)

  return <>
    <span>Hello World</span>
    <UserInfo />
  </>
}

export default App
