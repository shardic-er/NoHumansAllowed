// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

app.get('/', (request, response) => {
    console.log('page loaded')
    response.send('Game server is running');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Game server listening at http://localhost:${port}`);
});
