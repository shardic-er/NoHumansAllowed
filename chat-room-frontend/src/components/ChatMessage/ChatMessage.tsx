import {Toast} from "react-bootstrap";
import {capitalize} from "../../Utils/functions";
import {ChatPost} from "../../Utils/Interfaces";

function ChatMessage(props: {message: ChatPost, currentRoom:string, key?:number}) {
    const {username, message, currentRoom} = props

    return <Toast style={{
        marginBottom:'10px',
        display:'block',
        width:'auto',
    }}>
        <Toast.Header closeButton={false} style={{display:'flex', justifyContent:'space-between'}}>
            <strong>{capitalize(username)}</strong>
            {(currentRoom)?
                <strong>{'Room: ' + capitalize(currentRoom)}</strong>
                :  <strong>Room: Undefined</strong>
            }
        </Toast.Header>
        <Toast.Body style={{textAlign:"left"}}>
            <span>{message}</span>
        </Toast.Body>
    </Toast>
}

export default ChatMessage
