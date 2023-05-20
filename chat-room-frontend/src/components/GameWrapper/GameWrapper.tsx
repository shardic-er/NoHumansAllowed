import {AppUser, ChatPost} from "../../Utils/Interfaces";
import React, {useEffect, useState} from "react";
import InfoHeader from "../InfoHeader/InfoHeader";
import MessageContainer from "../MessageContainer/MessageContainer";
import ActivePlayers from "../ActivePlayers/ActivePlayers";
import {testUser} from "../../Utils/testObjects";
import ChatWindow from "../ChatWindow/ChatWindow";
import {io, Socket} from "socket.io-client";
import {getGameServerURL} from "../../Utils/config";
import ChatMessage from "../ChatMessage/ChatMessage";

function GameWrapper(props:{
    appUser:AppUser|undefined,
    setAppUser:React.Dispatch<React.SetStateAction<AppUser|undefined>>,
    muted:boolean,
    setMuted:React.Dispatch<React.SetStateAction<boolean>>
    setMusic:()=>void
}){

    const {appUser, setAppUser, muted, setMuted, setMusic} = props;

    const [currentRoom, setCurrentRoom] = useState(undefined)

    const [messageLog, setMessageLog] = useState<ChatPost[]>([])

    // Socket.IO client
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    useEffect(() => {
        const newSocket = io(getGameServerURL(), {
            autoConnect: false,
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('server message', (msg:ChatPost) => {
            const newMessage = {username: msg.username, message:msg.message}
            setMessageLog(prevLog => [...prevLog, newMessage]) // using a function to avoid dependency on messageLog
        });

        setSocket(newSocket);

        if (appUser) {
            newSocket.connect();
        }

        // Clean up the effect
        return () => {
            newSocket.disconnect();
        };
    }, [appUser]);

    return (appUser !== undefined) ?
        <>
            <InfoHeader
                user={appUser}
                setAppUser={setAppUser}
                setSocket={setSocket}
                muted={muted}
                setMuted={setMuted}
            />

            <div style={{ width: '70vw', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <MessageContainer appUser={appUser} messageLog={messageLog} roomName={currentRoom}/>
                </div>
                <div style={{ flex: 0 }}>
                    <ActivePlayers playerList={[testUser]} />
                </div>
            </div>

            {
                (socket !== undefined) ?
                    <ChatWindow
                        appUser={appUser}
                        socket={socket}
                    /> :
                    <></>
            }
        </> :
        <></>
}

export default GameWrapper