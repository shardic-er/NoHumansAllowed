import {AppUser, ChatPost, Room} from "../../Utils/Interfaces";
import React, {useEffect, useState} from "react";
import InfoHeader from "../InfoHeader/InfoHeader";
import MessageContainer from "../MessageContainer/MessageContainer";
import ActivePlayers from "../ActivePlayers/ActivePlayers";
import {testUser} from "../../Utils/testObjects";
import ChatWindow from "../ChatWindow/ChatWindow";
import {io, Socket} from "socket.io-client";
import {getGameServerURL} from "../../Utils/config";

function GameWrapper(props:{
    appUser:AppUser|undefined,
    setAppUser:React.Dispatch<React.SetStateAction<AppUser|undefined>>,
    muted:boolean,
    setMuted:React.Dispatch<React.SetStateAction<boolean>>
    setMusic:()=>void
}){

    const {appUser, setAppUser, muted, setMuted, setMusic} = props;

    const [currentRoom, setCurrentRoom] = useState('')
    const [playerList, setPlayerList] = useState<AppUser[]>([])
    const [messageLog, setMessageLog] = useState<ChatPost[]>([])

    // Socket.IO client
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    useEffect(() => {

        const newSocket = io(getGameServerURL(), {
            autoConnect: false,
            auth: {appUser: appUser},
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('join room', 'lobby', appUser);
        });

        newSocket.on('join room', (room:Room) => {
            console.log(`${appUser?.username} Joined room: ${room.name}`);
            setCurrentRoom(room.name);
        });

        newSocket.on('user joined', (username, roomName) => {
            console.log(`${username} Joined room: ${roomName}`);
        })

        newSocket.on('leave room', (room:string) => {
            console.log('left:', room)
            setCurrentRoom('lobby');
        })

        newSocket.on('server message', (messageLog) => {
            setMessageLog(messageLog) // using a function to avoid dependency on messageLog
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
                socket={socket}
                setSocket={setSocket}
                muted={muted}
                setMuted={setMuted}
            />

            <div style={{ width: '70vw', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <MessageContainer appUser={appUser} messageLog={messageLog} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
                </div>
                <div style={{ flex: 0 }}>
                    <ActivePlayers playerList={playerList} />
                </div>
            </div>

            {
                (socket !== undefined) ?
                    <ChatWindow
                        appUser={appUser}
                        socket={socket}
                        currentRoom={currentRoom}
                        setCurrentRoom={setCurrentRoom}
                    /> :
                    <></>
            }
        </> :
        <></>
}

export default GameWrapper