import './App.css'
import { UserInfo } from './components/UserInfo/UserInfo'
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginButton from "./components/LoginComponent/LoginComponent";
import {useState} from "react";
import {AppUser} from "./Utils/Interfaces";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import GameWrapper from "./components/GameWrapper/GameWrapper";

function App() {
  const defaultUser:AppUser|undefined = undefined

  const [appUser, setAppUser] = useState(defaultUser)

  return <>

    {/*Nav bar goes out here*/}

    {/*Wrapper for the game, only renders the content when user is logged in*/}
    <GameWrapper
        appUser={appUser}
        setAppUser={setAppUser}>

      <div>Hello User</div>
      <UserInfo />
      <ChatWindow
          appUser={appUser}
          setAppUser={setAppUser}
      />
    </GameWrapper>

    <LoginComponent
        appUser={appUser}
        setAppUser = {setAppUser}
    />

  </>
}

export default App
