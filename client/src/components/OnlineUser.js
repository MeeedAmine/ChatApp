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
        background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(70,252,164,1) 100%)",
        borderRadius: 30,
        display: 'inline-flex',
        height: 40,
        width: "90%"
    },
    avatar: {
        position: "relative" ,
        background: random(["#3f5efb", "#46fca4", "#833ab4", "#fdbb2d"])
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
