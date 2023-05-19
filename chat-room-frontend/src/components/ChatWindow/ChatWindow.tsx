import {Socket} from "socket.io-client";
import {Form, FormControl, Nav} from 'react-bootstrap';
import React, { useState } from 'react';
import {AppUser} from "../../Utils/Interfaces";

const ChatWindow = ({appUser, socket}: {appUser:AppUser, socket:Socket}) => {

    const [message, setMessage] = useState('');
    const maxCharacterLimit = 140;

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        if(message.length<=maxCharacterLimit){
            event.preventDefault();
            sendMessage(message);
            setMessage('');
        } else {
            //do nothing for now (add notification later)
        }
    }

    const sendMessage = (message:string)=>{
        if(socket) {
            socket.emit('client message' , {user:appUser, message:message})
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