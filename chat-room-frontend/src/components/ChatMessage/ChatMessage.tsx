import {Toast} from "react-bootstrap";
import {capitalize} from "../../Utils/functions";

function ChatMessage(props: {username: string, message: string, key?:number}) {
    const {username, message} = props

    return <Toast style={{display:'inline-block', width:'auto', minWidth:'15rem', maxWidth: '25rem' }}>
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
