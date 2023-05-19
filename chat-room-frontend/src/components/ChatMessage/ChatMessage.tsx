import {Toast} from "react-bootstrap";
import {capitalize} from "../../Utils/functions";

function ChatMessage(props: {username: string, message: string, roomName:string, key?:number}) {
    const {username, message, roomName} = props

    return <Toast style={{
        marginBottom:'10px',
        display:'block',
        width:'auto',
    }}>
        <Toast.Header closeButton={false} style={{display:'flex', justifyContent:'space-between'}}>
            <strong>{capitalize(username)}</strong>
            {(roomName)?
                <strong>{'Room: '+capitalize(roomName)}</strong>
                :  <strong>Room: Undefined</strong>
            }
        </Toast.Header>
        <Toast.Body style={{textAlign:"left"}}>
            <span>{message}</span>
        </Toast.Body>
    </Toast>
}

export default ChatMessage
