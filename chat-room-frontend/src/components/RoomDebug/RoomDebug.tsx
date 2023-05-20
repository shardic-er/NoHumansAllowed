import {Button} from "react-bootstrap";
import {useState} from "react";

function RoomDebug(){

    const [roomString, setRoomString] = useState('')

    const joinRoom = () => {
        alert(roomString)
    }

    const handleInputGroupChange = (event) => {
        setRoomString(event.target.value)
    }

    return <>
        <div style={{display:'flex'}}>
            <Button
                style={{borderRadius:"1rem", textAlign:'center'}}
                onClick={joinRoom}
                children={'Join'}
            />

            <input
                style={{borderRadius:"1rem", textAlign:'center'}}
                placeholder='room'
                value={roomString}
                onChange={handleInputGroupChange}
            />
        </div>
    </>
}

export default RoomDebug