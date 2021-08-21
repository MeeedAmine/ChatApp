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
const useStyles = makeStyles({
    container: {
        background: "#C4C4C4",
        borderRadius: 30,
        display: 'inline-flex',
        height: 40,
        width: "90%"
    },
    avatar: {
        position: "relative" 
    },
    text:{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "30px",
      fontSize: "20px"
    }
})
export default function OnlineUser() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Avatar src="/logo192.png" className={classes.avatar}/>
            <Typography className={classes.text}>
                Amine
            </Typography>
        </div>
    )
}
