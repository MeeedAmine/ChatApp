import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles({
    container: {
        background: "#50ebc6",
        border: "solid 1px #0af0b9",
        borderRadius: "12px",
        marginBottom: "2px",
        width: "40%",
        display: "inline-block",
        textAlign: "left"
    },
    containerAdmin: {
        background: "#4bc3eb",
        border: "solid 1px #a6dbed",
        borderRadius: "12px",
        marginBottom: "2px",
        width: "40%",
        display: "inline-block",
        textAlign: "center"
    },
    username:{
        fontSize: "12px",
        borderRadius: "12px",
        margin: "0px 3px",
        
    },
    text:{
        margin: "0px 5px"
    },
    time:{
        margin: "0px 2px",
        display: "flex",
        justifyContent: "flex-end"
    },
    admin: {
        textAlign: "center"
    },
    sender: {
        textAlign: "right"
    },
    receiver: {
        textAlign: "left"
    }
})

export default function Message({message, sender}) {
    const classes = useStyles();
    const [isAdmin, setIsAdmin] = useState(message.username === "ChatApp Bot" ? true : false);
    const [isSender, setIsSender] = useState(message.username === sender ? true : false);

    return (
        <div className={
            clsx({
                [classes.sender]: isSender && !isAdmin,
                [classes.receiver]: !isSender && !isAdmin,
                [classes.admin] : isAdmin,
            })}>
            <div className={isAdmin ? classes.containerAdmin : classes.container}>
            {!isAdmin && <Typography 
            variant="body2" 
            className={classes.username}
            >
                {message.username}
            </Typography>}
             <Typography variant="body1" className={classes.text}>
                 {message.text}
            </Typography>
             {!isAdmin && <Typography variant="caption" className={classes.time}>
                 {message.time}
            </Typography>}
        </div>
        </div>
        
    )
}
