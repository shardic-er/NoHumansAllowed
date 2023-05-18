import {Socket} from "socket.io-client";
import { Form, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';
import {AppUser} from "../../Utils/Interfaces";

const ChatWindow = ({appUser, socket}: {appUser:AppUser, socket:Socket}) => {

    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    const sendMessage = (message:string)=>{
        if(socket) {
            socket.emit('client message' , {user:appUser, message:message})
        }
    }

    return <>
            <Form
                onSubmit={handleSubmit}>
                <FormControl
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="I AM NOT A ROBOT"
                />
            </Form>
        </>

};

export default ChatWindow;