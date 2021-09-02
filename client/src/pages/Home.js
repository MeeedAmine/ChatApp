import React from 'react'
import TextField from "@material-ui/core/TextField"
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ForumIcon from '@material-ui/icons/Forum';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    form: {
      margin: theme.spacing(1),
      alignItems: "center",
      textAlign: "center",
      marginTop: "40px"
    },
    container: {
        maxWidth: "500px",
        height: "400px",
        background: "#f9f9f9",
        margin: "80px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
    },
    title: {
        marginTop: "35px"
    },
    username: {
        display: "flex",
        marginTop: "15px"
    },
    room: {
        display: "flex",
        marginTop: "15px"
    },
    btn: {
        marginTop: "15px"
    }
  }));

export default function Home() {
    const classes = useStyles();
    const history = useHistory();
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [roomError, setRoomError] = useState(false);
    
    const handleRoom = (e) => {
        const newRoom = e.target.value;
        setRoom(newRoom);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === ""){
            setUsernameError(true);
        }
        if(room === ""){
            setRoomError(true);
        }
        if(username && room){
            history.push(`/chat?username=${username}&room=${room}`)
        }
    }
    return (
        <Container className={classes.container}>
            <Typography
            variant="h6"
            className={classes.title}
            >
                Join a room and chat
            </Typography>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="username"
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                    ),
                    }}
                    required
                    error={usernameError}
                    className={classes.username}
                />
                <TextField
                    id="room"
                    label="Room or ID"
                    onChange={(e) => setRoom(e.target.value)}
                    InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <ForumIcon />
                    </InputAdornment>
                    ),
                    }}
                    error={roomError}
                    required
                    className={classes.room}
                />
                {/* <FormControl required className={classes.formControl}>
                    <InputLabel htmlFor="room">Rooms</InputLabel>
                    <NativeSelect
                    value={room}
                    onChange={handleRoom}
                    >
                    <option aria-label="None" value="" />
                    <option value={"Python"}>Python</option>
                    <option value={"Javascript"}>Javascript</option>
                    <option value={"Chess"}>Chess</option>
                    </NativeSelect>
                <FormHelperText>Choose a room to join</FormHelperText>
                </FormControl> */}
                <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                endIcon={<ArrowForwardIosIcon />}
                className={classes.btn}
                >
                Join
                </Button>
            </form>
        </Container>
    )
}
