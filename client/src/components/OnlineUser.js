import { Avatar, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles({
//     user: {
//         width: "60%",
//         marginBottom: "5px"
//     },
//     label:{

//     }
// })

function random(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

const useStyles = makeStyles({
    container: {
        background: "#00B2FF",
        borderRadius: 30,
        display: 'inline-flex',
        height: 40,
        width: "90%",
        marginBottom: "2px"
    },
    avatar: {
        position: "relative" ,
        background: "#006AFF"
    },
    text:{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "30px",
      fontSize: "20px"
    }
})
export default function OnlineUser({username}) {
    const classes = useStyles();
    const letter = username[0].toUpperCase();
    return (
        <div className={classes.container}>
            <Avatar className={classes.avatar}>{letter}</Avatar>
            <Typography className={classes.text}>
                {username}
            </Typography>
        </div>
    )
}
