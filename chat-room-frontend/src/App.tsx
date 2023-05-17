import './App.css'
import { useState } from 'react'
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginButton from "./components/LoginComponent/LoginButton";
import UserInfo from './components/UserInfo/UserInfo'
import InfoHeader from './components/InfoHeader/InfoHeader'

function App() {

  const [count, setCount]:[number, React.Dispatch<any>] = useState(0);

  return <>
    <InfoHeader count={count} setCount={setCount}/>
    <span>Hello World</span>
    <UserInfo />
    <div>Hello User</div>
    <UserInfo />
    <ChatWindow sendMessage = {""}/>
    <LoginButton/>
  </>
}

export default App




