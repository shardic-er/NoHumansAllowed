import {AppUser, ChatPost} from "../../Utils/Interfaces";
import ChatMessage from "../ChatMessage/ChatMessage";
import './MessageContainer.css'
import {useEffect, useRef, useState} from "react";

function MessageContainer(props:{appUser:AppUser, messageLog:ChatPost[]}) {
    const [container, setContainer] = useState(null);
    const messageLog:ChatPost[] = props.messageLog

    const containerRef = useRef(null);

    useEffect(() => {
        setContainer(containerRef.current);
    }, []);

    useEffect(() => {
        const handleScroll = (e) => {
            e.preventDefault();
            if (container) {
                container.scrollTop += e.deltaY;
            }
        };

        if (container) {
            container.addEventListener("wheel", handleScroll, { passive: false });

            // Clean up function
            return () => {
                container.removeEventListener("wheel", handleScroll);
            }
        }
    }, [container]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messageLog]);

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

    const containerStyle = {
        position:'absolute',
        bottom: '10vw',
        left: '15vw',
        overflowY: 'auto',
        maxHeight: '65.3vh',
        scrollbarWidth: 'none', /* For Firefox */
        msOverflowStyle: 'none', /* For Internet Explorer and Edge */
        flexDirection: 'column-reverse',
        width:"40vw",
        justifyContent: 'flex-start', // Left justify the toasts
        // border:'solid',
        // borderColor:'rgba(20,20,20,1)',
        // padding:'1rem',
        // borderRadius:'0.5rem',
        // backgroundColor:'rgba(50,50,50,1)'
    };



    return (
        <div
            ref={containerRef}
            style={containerStyle}>
            {createToasts(messageLog)}
        </div>
    );
}

export default MessageContainer;