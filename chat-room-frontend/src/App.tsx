import './App.css'
import {useState} from 'react'
import LoginComponent from "./components/LoginComponent/LoginComponent";
import GameWrapper from "./components/GameWrapper/GameWrapper";
import { Helmet } from 'react-helmet-async';
import Music from './components/Music/Music';
import sampleMusic from '../../Docs/Music/sampleMusic.mp3';
import comeBack from '../../Docs/Music/comeBack.mp3';

function App() {

  const [appUser, setAppUser] = useState(undefined)
  const [musicSource, setMusicSource] = useState<string>('');
  const [muted, setMuted] = useState(true)

  // useEffect(() => {
  //   localStorage.setItem('username', JSON.stringify(appUser?.username));
  //   console.log('username: ', localStorage.getItem('userSession'))
  // }, [appUser])

  // This function gets handed down as a prop to the login component 
  const handleInitialMusicSourceChange = () => {
    setMusicSource(sampleMusic);
  }

  const handleMusicSourceChange = () => {
    setMusicSource(comeBack);
    // Later want to add logic for when to change music to different sources
  }

  return <div className="App">

    <Helmet children={<style>{`body {background-color: #242424;}`}</style>}/>

    <Music musicSource={musicSource} muted={muted}/>

    <GameWrapper
        appUser={appUser}
        setAppUser={setAppUser}
        muted={muted}
        setMuted={setMuted}
        setMusic={handleMusicSourceChange}
    />

    <LoginComponent
        appUser={appUser}
        setAppUser = {setAppUser}
        musicPlayOnClick= {handleInitialMusicSourceChange}
    />
  </div>
}

export default App
