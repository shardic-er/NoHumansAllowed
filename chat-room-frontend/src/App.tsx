import { useState } from 'react'
import './App.css'
import UserInfo from './components/UserInfo/UserInfo'
import InfoHeader from './components/InfoHeader/InfoHeader'

function App() {
  const [count, setCount]:[number, React.Dispatch<any>] = useState(0);

  return <>
    <InfoHeader count={count} setCount={setCount}/>
    <span>Hello World</span>
    <UserInfo />
  </>
}

export default App
