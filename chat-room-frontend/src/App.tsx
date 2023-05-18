import './App.css'
import { useState } from 'react'
import ChatWindow from "./components/ChatWindow/ChatWindow";
import {AppUser} from "./Utils/Interfaces";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import GameWrapper from "./components/GameWrapper/GameWrapper";
import UserInfo from './components/UserInfo/UserInfo'
import InfoHeader from './components/InfoHeader/InfoHeader'
import ChatFrame from './components/ChatFrame/ChatFrame';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import {Helmet} from "react-helmet";

function App() {
  const defaultUser:AppUser|undefined = undefined

  const [appUser, setAppUser] = useState(defaultUser)

  return <>
    <Helmet bodyAttributes={{style: 'background-color : #242424'}}/>
    {/*Nav bar goes out here*/}

    {/*Wrapper for the game, only renders the content when user is logged in*/}
    <GameWrapper
        appUser={appUser}
        setAppUser={setAppUser}>
          
      <InfoHeader user={appUser}/>
      <ChatFrame appUser={appUser}/>
      <UserInfo user={appUser} />
      <ChatWindow appUser={appUser}/>
      <Chat username="exampleusername" message="examplemessage"/>
      <Profile imgURL="Image_source" isSpectator={true} />

    </GameWrapper>

    <LoginComponent
        appUser={appUser}
        setAppUser = {setAppUser}
    />

  </>
}

export default App
