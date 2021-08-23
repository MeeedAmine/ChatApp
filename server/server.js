const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

app.use(cors());

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'ChatApp Bot'; 

io.on('connection', socket => {
    socket.on('joinRoom', ({username, room})=>{
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        // welcome current user
        socket.emit('message', formatMessage(botName,`Welcome ${user.username} to ChatApp!`));

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));

        // Send users and room info 
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chat message
    socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg));
    });

    //Runs when a client disconnects
    socket.on('disconnect', ()=> {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName,`${user.username} has left the room`));

            // Send users and room info 
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
        
    });
});
server.listen(9000, ()=> console.log('Server runnig on port 9000'));