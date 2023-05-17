import { useEffect } from "react";
import { io } from "socket.io-client";
import { Form, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';

const ChatWindow = ({ sendMessage }) => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:8081');

        socket.on('chat message', (msg) => {
            console.log('Message received:', msg);
        });

        socket.emit('chat message', 'Hello from React');
    }, []);

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormControl
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="I AM NOT A ROBOT"
            />
        </Form>
    );

};

export default ChatWindow;