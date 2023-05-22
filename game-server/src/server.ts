// server.ts
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import {AppUser, Message, Room} from "./Interfaces/Interfaces";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const port = 8081;

let rooms: Room[] = [{name:'lobby', users:[], messages:[]}];

function leaveRoom(socket:Socket, user:AppUser, roomName:string){
    console.log(user.username + ' left: ' + roomName)
    socket.to(roomName).emit('leave room', roomName)
    socket.leave(roomName)
    cleanUpRooms()
}

function joinRoom(socket:Socket, user:AppUser, roomName:string){

    const room = rooms.find(room => room.name === roomName);

    if (room) {
        console.log(`${user.username} joined: `, roomName)
        socket.join(roomName);
        socket.to(roomName).emit('user joined', room)

        io.to(socket.id).emit('server message', room.messages);
        io.to(socket.id).emit('join room', room)
    }

    cleanUpRooms()
}

function cleanUpRooms(){
    rooms = rooms.filter(room => (room.name =='lobby') || (room.users.length !== 0))
}

function leaveAllRooms(socket:Socket, appUser:AppUser){
    rooms = rooms.map(room=>{
        return {
            ...room,
            users:room.users
                .filter((user:AppUser)=> {
                    // Side effect - user leaves other rooms they may be in.
                    if(user.user_id === appUser.user_id){
                        leaveRoom(socket, user, room.name)
                    }
                    return (user.user_id !== appUser.user_id)
                })
        }
    })
}

function createOrFindExistingRoom(roomName:string){
    let room = rooms.find(room => room.name === roomName);
    if (!room) {
        // Create a new room if it doesn't exist
        room = {name: roomName, users: [], messages: []};
        rooms.push(room);
    }
    return room
}

app.get('/', (request, response) => {
    console.log('page loaded')
    response.setHeader('Content-Type', 'application/json');
    response.json(rooms);
});

io.on('connection', (socket) => {

    const appUser:AppUser = socket.handshake.auth.appUser as AppUser;
    console.log(`${appUser.username} connected with id: ${appUser.user_id} and socket id ${socket.id}`);

    socket.on('join room', (roomName) => {

        leaveAllRooms(socket, appUser)

        const room = createOrFindExistingRoom(roomName)

        // Add the user to the room (record server side)
        room.users.push(appUser);

        joinRoom(socket, appUser, roomName)

        // notify users in the room a new user has joined
        socket.emit('user joined: ', room);

        if(room){ // give the joining user the info for the room
            io.to(socket.id).emit('join room', room)
        }
    });

    socket.on('leave room', (roomName:string) => {

        const room:Room|undefined = rooms.find( room => room.name === roomName )
        const lobbyRoom:Room|undefined = rooms.find( room => room.name === 'lobby')

        // send the user to the lobby
        if(lobbyRoom){
            joinRoom(socket, appUser, 'lobby')
            socket.to(socket.id).emit('leave room', roomName)
        }

        if(room) {
            // Tell everyone else who's still in the room.
            socket.to(roomName).emit('user left', {
                ...room,
                users:room.users.filter((user:AppUser) => {
                    return user.username !== appUser.username
                })
            })
        }
    });

    socket.on('client message', (message:Message) => {

        console.log(message)

        console.log(message.username, 'says: ', message.message)

        const room = rooms.find(room => room.name === message.room);

        if (room) {
            room.messages.push(message);
            io.to(message.room).emit('server message', room.messages);
        }
    });

    socket.on('disconnect', () => {
        // Remove the user from all rooms they are in
        rooms.forEach(room => {
            room.users.map(user => {
                if(user.user_id !== appUser.user_id){
                    leaveRoom(socket, appUser, room.name)
                }
            });
        });

        // special case for purging lobby
        rooms = rooms.map((room:Room) => {
            if(room.name!=='lobby'){
                return room
            } else {
                const newUserList = room.users.filter((user:AppUser) => (user.username != appUser.username))
                room.users = newUserList;
                return room
            }
        })

        console.log(`${appUser.username} disconnected`);
    });
});

server.listen(port, () => {
    console.log(`Game server listening at http://localhost:${port}`);
});
