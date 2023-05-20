import {Button} from "react-bootstrap";
import {useState} from "react";
import {Socket} from "socket.io-client";

function RoomDebug(props:{socket:Socket|undefined}){

    const socket = props.socket

    const [roomString, setRoomString] = useState('')

    const [hidden, setHidden] = useState(true)

    const joinRoom = () => {
        if(socket){
            socket.emit('join room', roomString);
        } else {
            console.log(socket)
            alert('socket was undefined or null')
        }
    }

    const leaveRoom = () => {
        if(socket){
            socket.emit('leave room', roomString);
        } else {
            console.log(socket)
            alert('socket was undefined or null')
        }
    }

    const handleInputGroupChange = (event) => {
        setRoomString(event.target.value)
    }

    const iconShown = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-bug-fill" viewBox="0 0 16 16">
            <path
                d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/>
            <path
                d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/>
        </svg>
    }

    const iconHidden = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bug"
                    viewBox="0 0 16 16">
            <path
                d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
        </svg>
    }

    return <>
        <div style={{display:'flex', padding:'.5rem'}}>
            {(!hidden) ? <>
                    <Button
                        style={{borderRadius:"1rem", textAlign:'center', margin:'.25rem'}}
                        children={iconHidden()}
                        onClick={()=>setHidden(hidden=>!hidden)}
                    />

                    <input
                        style={{borderRadius:"1rem", textAlign:'center',  margin:'.25rem', maxWidth:'5rem'}}
                        placeholder='room #'
                        value={roomString}
                        onChange={handleInputGroupChange}
                    />

                    <Button
                        style={{borderRadius:"1rem", textAlign:'center',  margin:'.25rem'}}
                        onClick={joinRoom}
                        children={'Join'}
                    />

                    <Button
                        style={{borderRadius:"1rem", textAlign:'center',  margin:'.25rem'}}
                        onClick={leaveRoom}
                        children={'leave'}
                    />

                </>
                : <div style={{display:'flex'}}>
                    <Button
                        style={{borderRadius:"1rem", textAlign:'center', margin:'.25rem'}}
                        children={iconShown()}
                        onClick={()=>setHidden(hidden=>!hidden)}
                    />
                </div>
            }

        </div>
    </>

}

export default RoomDebug