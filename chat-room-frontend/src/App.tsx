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
import ActivePlayers from "./components/ActivePlayers/ActivePlayers";
import Music from './components/Music/Music';
import sampleMusic from '../../Docs/Music/sampleMusic.mp3';
import comeBack from '../../Docs/Music/comeBack.mp3';
import {testUser} from "./Utils/testObjects";

function App() {
  const defaultUser:AppUser|undefined = undefined

  const [appUser, setAppUser] = useState(defaultUser)
  const [messageLog, setMessageLog] = useState([]);
  const [musicSource, setMusicSource] = useState<string>('');
  const [muted, setMuted] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(undefined)

  // This function gets handed down as a prop to the login component 
  const handleInitialMusicSourceChange = () => {
    setMusicSource(sampleMusic);
  }

  const handleMusicSourceChange = () => {
    setMusicSource(comeBack);
    // Later want to add logic for when to change music to different sources
  }

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
      setMessageLog(prevLog => [...prevLog, newMessage]) // using a function to avoid dependency on messageLog
      handleMusicSourceChange()
    });

    setSocket(newSocket);

    if (appUser) {
      newSocket.connect();
    }

    // Clean up the effect
    return () => {
      newSocket.disconnect();
    };
  }, [appUser]);

  return <div className="App">
    <Helmet>
      <style>{`body {background-color: #242424;}`}</style>
    </Helmet>
    {/*<Music musicSource={musicSource} muted={muted}/>*/}
    <GameWrapper appUser={appUser} setAppUser={setAppUser}>

      <InfoHeader
          user={appUser}
          setAppUser={setAppUser}
          setSocket={setSocket}
          muted={muted}
          setMuted={setMuted}
      />

      <div style={{ width: '70vw', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <MessageContainer appUser={appUser} messageLog={messageLog} roomName={currentRoom}/>
        </div>
        <div style={{ flex: 0 }}>
          <ActivePlayers playerList={[testUser]} />
        </div>
      </div>

      <div style={{width:'70vw' ,display:'flex', justifyContent: 'space-between' }}>
        <MessageContainer appUser={appUser} messageLog={messageLog} roomName={currentRoom}/>
        <ActivePlayers playerList={[appUser]}/>
      </div>

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
        musicPlayOnClick= {handleInitialMusicSourceChange}
    />
  </div>
}

export default App
