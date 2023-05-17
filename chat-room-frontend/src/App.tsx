import './App.css'
import { UserInfo } from './components/UserInfo/UserInfo'
import ChatWindow from "./components/ChatWindow/ChatWindow";
import LoginButton from "./components/LoginComponent/LoginButton";

function App() {

  return <>
    <div>Hello User</div>
    <UserInfo />
    <ChatWindow />
    <LoginButton/>
  </>
}

export default App
