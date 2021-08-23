import React from 'react'
import TextField from "@material-ui/core/TextField"
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container, FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: 200
    },
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
        if(room === ''){
            setRoomError(true)
        }
        if(username && room){
            history.push(`/chat?username=${username}&room=${room}`)
        }
    }
    return (
        <Container>
            <form novalidate autoComplete="off" onSubmit={handleSubmit}>
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
                />
                <FormControl required className={classes.formControl}>
                    <InputLabel htmlFor="room">Rooms</InputLabel>
                    <NativeSelect
                    value={room}
                    onChange={handleRoom}
                    >
                    <option aria-label="None" value="" />
                    <option value={"python"}>Python</option>
                    <option value={"javascript"}>Javascript</option>
                    <option value={"chess"}>Chess</option>
                    </NativeSelect>
                <FormHelperText>Choose a room to join</FormHelperText>
                </FormControl>
                <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                endIcon={<ArrowForwardIosIcon />}
                >
                Join
                </Button>
            </form>
        </Container>
    )
}
