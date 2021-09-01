const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require('cors');
const router = require("./router");
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');



const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(router)




const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });;



const botName = 'ChatApp Bot'; 

io.on('connection', socket => {
    socket.on('joinRoom', ({username, room})=>{
        const user = userJoin(socket.id, username, room);
        console.log(user);
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
server.listen(process.env.PORT || 5000, ()=> console.log('Server runnig on port 5000'));