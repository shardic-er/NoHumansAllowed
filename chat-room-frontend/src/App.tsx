import './App.css'
import {useEffect, useState} from 'react'
import ChatWindow from "./components/ChatWindow/ChatWindow";
import {AppUser, ChatPost} from "./Utils/Interfaces";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import GameWrapper from "./components/GameWrapper/GameWrapper";
import InfoHeader from './components/InfoHeader/InfoHeader'
import MessageContainer from './components/MessageContainer/MessageContainer';
import { Helmet } from 'react-helmet-async';
import {io, Socket} from "socket.io-client";
import {getGameServerURL} from "./Utils/config";


function App() {
  const defaultUser:AppUser|undefined = undefined

  const [appUser, setAppUser] = useState(defaultUser)
  const [messageLog, setMessageLog] = useState([]);

  // Socket.IO client
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  useEffect(() => {
    const newSocket = io(getGameServerURL(), {
      autoConnect: false,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('server message', (msg:ChatPost) => {
      const newMessage = {username: msg.username, message:msg.message}
      setMessageLog([...messageLog, newMessage])
    });

    setSocket(newSocket);
    newSocket.connect();

    // Clean up the effect
    return () => {
      newSocket.disconnect();
    };
  }, [appUser, messageLog]);

  return <div className="App">
    <Helmet>
      <style>{`body {background-color: #242424;}`}</style>
    </Helmet>

    <GameWrapper appUser={appUser} setAppUser={setAppUser}>

      <InfoHeader user={appUser} setAppUser={setAppUser} setSocket={setSocket}/>

      <MessageContainer appUser={appUser} messageLog={messageLog}/>
      {/*<ActivePlayers playerList={[appUser]}/>*/}

      {
        (socket !== undefined) ?
            <ChatWindow
                appUser={appUser}
                socket={socket}
            /> :
            <></>
      }

    </GameWrapper>

    <LoginComponent
        appUser={appUser}
        setAppUser = {setAppUser}
    />
  </div>
}

export default App
