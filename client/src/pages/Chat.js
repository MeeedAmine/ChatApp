import React, { useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import { Container, Tabs, Tab, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import OnlineUser from '../components/OnlineUser';
import { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import io from "socket.io-client";
import queryString from "query-string";
import { useHistory, useLocation } from 'react-router-dom';
import Message from '../components/Message';
let socket;



const useStyles = makeStyles((theme) => ({
    container: {
     width: 1080,
     height: 700,
     background: "linear-gradient(90deg, rgba(0,1,36,1) 0%, rgba(19,104,116,1) 48%, rgba(0,212,255,1) 95%)",
     padding: "10px",
     margin: "30px 10%",
     display: "grid", 
     gridTemplateColumns: "repeat(3, 1fr)",
     gridTemplateRows: "1fr 1fr 1fr",
     
    },
    chatInfo:{
      gridArea: "1 / 1 / 4 / 2",
      padding: "10px",
      margin: "30px",
      background: "#9C77EA",
      color: "#f9f9f9",
      height:"85%",
      borderRadius: 30
    },
    root: {
     flexGrow: 1,
     display: 'flex',
     flexDirection: "column",
     height: 180,
     justifyContent: "center",
     alignItems: "center",

     },
     room:{
      borderRadius: 30,
      display: 'inline-flex',
      height: 40,
      width: "80%",
      alignItems: 'center',
      justifyContent: 'center',
      background: "#3f5efb"
     },
     btn: {
      marginTop: "10px",
      display: "flex"
     },
     users: {
       overflowY: "scroll",
       margin: "20px",
       maxHeight: "200px"
     },
     chatWindow: {
       gridArea: "1 / 2 / 3 / 4",
       padding: "20px",
       marginTop: "30px",
       width: "600px",
       height: "450px",
       backgroundColor: "#fff",
       borderRadius: "30px",
       maxHeight: "500px", //TODO change it to the right max after testing displaying many messages
       overflowY: "scroll",

     },
     inputWrapper:{
       gridArea: "3 / 2 / 4 / 4",
       display: "flex",
       alignItems: "center"
     },
     inputField:{
       width: "550px",
     }
   }));




export default function Chat() {
    const END_POINT = "http://localhost:5000/";
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const classes = useStyles();

    useEffect(() => {
      const {username, room} = queryString.parse(location.search);
      
      setUsername(username);
      setRoom(room);
      console.log(username, room);

      socket = io(END_POINT);
      // Join chatroom
      socket.emit('joinRoom', {username, room});
      
    }, [END_POINT, location.search]);

  useEffect(() => {
      socket.on("message", msg => {
        setMessages(messages => ([...messages, msg]));
      });
      // Get room and users 
      socket.on("roomUsers", ({ room, users}) => {
        setUsers(users);
        setRoom(room);
      });
      
    }, []);

  // handling scrolling to bottom of the chat window
  const DummyDiv = () => {
    const divRef = useRef(null);
  
    useEffect(() => {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  
    return <div ref={divRef} />;
  }
  
  
  

  const handleSubmit = (e) => {
      e.preventDefault();
      if(message){
          socket.emit("chatMessage", message);
          setMessage("");
          e.target.value = "";
      }
    }
    const handleMessage = (e) => {
      const newMessage = e.target.value;
      setMessage(newMessage);
    }
    return (
        <Container className={classes.container}>
        <div className={classes.chatInfo}>
          <Typography variant="h3">
            Room
          </Typography>
          <div className={classes.root}>
            
          <Typography
          variant="h4"
          className={classes.room}>
            {room}
          </Typography>
          <Button
            className={classes.btn}
            variant="contained"
            color="secondary"
            endIcon={<ExitToAppIcon />}
            href="/"
          >
          Leave
          </Button>
          </div>
          <Typography variant="h4">Online Users</Typography>
          <div className={classes.users}>
            {users && users.map(user => ( <OnlineUser username={user.username} key={user.id} /> ))}
          </div>
        </div>
        <div className={classes.chatWindow}>
        {
          messages.map((msg) => (
            <Message message={msg} sender={username} key={msg.id}/>
          ))
        }
        {/* scroll to bottom of the window when entering a message */}
        <DummyDiv />
        </div>
        <div className={classes.inputWrapper}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
          id="message"
          value={message}
          label="Type a message"
          variant="outlined"
          color="primary"
          className={classes.inputField}
          onChange={handleMessage}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
          Send
          </Button>
          </form>
        </div>
      </Container>
    )
}
