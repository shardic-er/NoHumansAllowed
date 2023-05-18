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

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                bottom: '15%', // Adjust according to the height of your input
                left: '0',
                right: '0',
                overflowY: 'auto',
                maxHeight: 'calc(80% - 60px)', // Adjust according to the height of your input
                scrollbarWidth: 'none', /* For Firefox */
                msOverflowStyle: 'none',  /* For Internet Explorer and Edge */
                margin:'auto',
                display: 'block', // Add this
                width: '70%', // Adjust this according to your needs
            }}
        >
            {createToasts(messageLog)}
        </div>
    );
}

export default MessageContainer;