import {Socket} from "socket.io-client";
import {Form, FormControl, Nav} from 'react-bootstrap';
import React, { useState } from 'react';
import {AppUser, ChatPost} from "../../Utils/Interfaces";

const ChatWindow = ({appUser, socket, currentRoom}:{
    appUser:AppUser,
    socket:Socket,
    currentRoom:string,
}) => {

    const [message, setMessage] = useState('');
    const maxCharacterLimit = 140;

    // You can type the event, and the function type will be inferred
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    // Or you can type the handler, and the event type will be inferred
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
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

                <Nav style={{position: 'absolute', bottom: '0', left: '0', width: '100%'}}>
                    
                    {/* Relatively positioned parent to affix the message length to */}
                    <div style={{
                            position: 'relative',
                            bottom: '0',
                            // left: '0',
                            right: '0',
                            width: '70%',
                            height:'6rem',
                            margin: '20px auto', // Center horizontally and give 10px space from bottom
                    }}>
                        {/* FormControl does not support children, so could not be the relatively positioned parent for the message length */}
                        <FormControl
                            style={{
                                height:'6rem',
                            }}
                            type="text"
                            value={message}
                            onChange={handleChange}
                            placeholder="I AM NOT A ROBOT"
                        />
                        {/* Positioned absolutely within relative parent of both itself and FormControl */}
                        <div className="characterCount"
                            style={{
                                position: 'absolute',
                                bottom: '5px',
                                right: '10px',
                                color: message.length > maxCharacterLimit ? 'red' : 'gray',
                                fontWeight: 'bold',
                                fontSize: '24px',
                            }}
                        >
                            {message.length}/{maxCharacterLimit}
                        </div>
                    </div>
                </Nav>
            </Form>
        </>

};

export default ChatWindow;