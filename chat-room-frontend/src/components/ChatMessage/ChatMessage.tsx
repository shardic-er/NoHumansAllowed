import {Toast} from "react-bootstrap";
import {capitalize} from "../../Utils/functions";

function ChatMessage(props: {username: string, message: string, key?:number}) {
    const {username, message} = props

    return <Toast
        style={{
        marginBottom:'10px',
        display:'block',
        width:'auto',
    }}>
        <Toast.Header
            closeButton={false}
            children={
            <strong className="me-auto">{capitalize(username)}</strong>
            }/>
        <Toast.Body style={{textAlign:"left"}}>
            <span>{message}</span>
        </Toast.Body>
    </Toast>
}

export default ChatMessage
