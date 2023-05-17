import './App.css'
import UserInfo from './components/UserInfo/UserInfo'
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginButton from "./components/LoginComponent/LoginButton";
import InfoHeader from './components/InfoHeader/InfoHeader'
import { SetStateAction, useState } from 'react';


function App() {

  const [count, setCount]:[number, React.Dispatch<React.SetStateAction<number>>] = useState(0);

  return <>
    <div>Hello User</div>
    <InfoHeader count={count} setCount={setCount}/>
    <span>Hello World</span>
    <UserInfo />
    <ChatWindow sendMessage={""} />
    <LoginButton/>
  </>
}

export default App
