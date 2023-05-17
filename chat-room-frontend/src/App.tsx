import './App.css'
import { useState } from 'react'
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginButton from "./components/LoginComponent/LoginButton";
import UserInfo from './components/UserInfo/UserInfo'
import InfoHeader from './components/InfoHeader/InfoHeader'
import ChatFrame from './components/ChatFrame/ChatFrame';

function App() {

  const [count, setCount]:[number, React.Dispatch<any>] = useState(0);
  const user: 
  // Replace data typing with Eli's interface
                {username:string
                password:string,
                stats: {gamesPlayed:number,
                        gamesWon:number,
                        gamesSurvived:number,
                        gamesAbandoned:number}} 
                = {username:'exampleusername',
                    password:'expass',
                    stats:{gamesPlayed:5,
                            gamesWon:0,
                            gamesSurvived:0,
                            gamesAbandoned:0}}

  return <>
    <InfoHeader count={count} setCount={setCount} user={user}/>
    <ChatFrame />
    {/* <UserInfo user={user} />
    <ChatWindow sendMessage = {""}/>
    <LoginButton/> */}
  </>
}

export default App




