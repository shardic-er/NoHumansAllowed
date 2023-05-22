import {ChatPost} from "../../Utils/Interfaces";
import ChatMessage from "../ChatMessage/ChatMessage";
import './MessageContainer.css'
import React, {useEffect, useRef, useState} from "react";

function MessageContainer(props:{currentRoom:string, setCurrentRoom:React.Dispatch<React.SetStateAction<string|undefined>>, messageLog:ChatPost[]}) {

    const currentRoom = props.currentRoom

    const messageLog:ChatPost[] = props.messageLog

    // useState returns an array with your state variable set to initial value and a method to change it.
    // The brackets aound the variables on the left destructure that array for you.
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    // Creates an empty ref object to be filled when the DOM node assigned to it renders
    const containerRef = useRef(null);

    useEffect(() => {
        setContainer(containerRef.current);
    }, []);

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
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
                currentRoom={currentRoom}
                message={message.message}
                key={index}/>
            )
        }
        return toasts
    }

    const containerStyle: React.CSSProperties = {
        position:'absolute',
        bottom: '10vw',
        left: '15vw',
        overflowY: 'auto',
        maxHeight: '65.3vh',
        scrollbarWidth: 'none', /* For Firefox */
        msOverflowStyle: 'none', /* For Internet Explorer and Edge */
        flexDirection: 'column-reverse',
        width:"40vw",
        // height:'100%',
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
            {/*<Card>Room: {currentRoom ?? '_undefined'}</Card>*/}
        </div>
    );
}

export default MessageContainer;