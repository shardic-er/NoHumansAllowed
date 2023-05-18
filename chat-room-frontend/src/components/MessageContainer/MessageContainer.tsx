import ToastContainer from 'react-bootstrap/ToastContainer'
import {AppUser, ChatPost} from "../../Utils/Interfaces";
import ChatMessage from "../ChatMessage/ChatMessage";

function MessageContainer(props:{appUser:AppUser, messageLog:ChatPost[]}) {

    const messageLog:ChatPost[] = props.messageLog

    const createToasts = (messageLog) => {

        const toasts = []
        for(const [index, message] of messageLog.entries()){
            toasts.push(<ChatMessage
                username={message.username}
                message={message.message}
                key={index}/>
            )
        }
        return toasts
    }

    return <>
        <ToastContainer
            containerPosition={"absolute"}
            position={'bottom-center'}
            style={{display:'flex', flexDirection:'column-reverse'}}
            children={createToasts(messageLog)}
        />

    </>

}

export default MessageContainer;