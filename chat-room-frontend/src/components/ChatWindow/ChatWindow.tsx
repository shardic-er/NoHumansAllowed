import {useEffect} from "react";
import {io, Socket} from "socket.io-client";
import { Form, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';
import {AppUser} from "../../Utils/Interfaces";
import {getGameServerURL} from "../../Utils/config";

const ChatWindow = ({appUser}: { appUser:AppUser}) => {

    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(getGameServerURL(), {
            autoConnect: false,
        });

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('server message', (msg) => {
            console.log(msg);
        });

        setSocket(newSocket);
        newSocket.connect();

        // Clean up the effect
        return () => {
            newSocket.disconnect();
        };
    }, [appUser]);

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