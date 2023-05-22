import {Socket} from "socket.io-client";
import {Form, FormControl, Nav} from 'react-bootstrap';
import React, { useState } from 'react';
import {AppUser, ChatPost} from "../../Utils/Interfaces";

const ChatWindow = ({appUser, socket, currentRoom, setCurrentRoom}:{
    appUser:AppUser,
    socket:Socket,
    currentRoom:string,
    setCurrentRoom:React.Dispatch<React.SetStateAction<string|undefined>>
}) => {

    const [message, setMessage] = useState('');
    const maxCharacterLimit = 140;

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        if(message.length<=maxCharacterLimit){
            event.preventDefault();
            sendMessage({room:currentRoom, username:appUser.username,message:message});
            setMessage('');
        } else {
            //do nothing for now (add notification later)
            alert('too long')
        }
    }

    const sendMessage = (message:ChatPost)=>{
        if(socket && currentRoom) {
            socket.emit('client message', message);
        }
    }

    return <>
            <Form onSubmit={handleSubmit}>
                <Nav>
                    <FormControl
                        style={{
                            position: 'fixed',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            width: '70%',
                            height:'10%',
                            margin: '20px auto', // Center horizontally and give 10px space from bottom
                        }}
                        type="text"
                        value={message}
                        onChange={handleChange}
                        placeholder="I AM NOT A ROBOT"
                    />

                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '31vh',
                            color: message.length > maxCharacterLimit ? 'red' : 'gray',
                            fontWeight: 'bold',
                            fontSize: '24px',
                        }}
                    >
                        {message.length}/{maxCharacterLimit}
                    </div>
                </Nav>
            </Form>
        </>

};

export default ChatWindow;