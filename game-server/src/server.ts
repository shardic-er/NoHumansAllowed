// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const port = 8081;

app.get('/', (request, response) => {
    console.log('page loaded')
    response.send('Game server is running');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('client message', (msg) => {
        const {user, message} = msg
        console.log(user + ': ' + message)
        io.emit('server message', {username:user.username, message:message});
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Game server listening at http://localhost:${port}`);
});
