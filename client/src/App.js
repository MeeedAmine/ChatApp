import './App.css';
import Typography from '@material-ui/core/Typography'
import { Container, Tabs, Tab, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import OnlineUser from './components/OnlineUser';
import { useState } from 'react';
import Icon from '@material-ui/core/Icon';

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
   borderRadius: 30,
 },
 root: {
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  height: 180,
  color: "black",
  width: "60%",
  marginLeft: "20px"
  },
  users: {
    overflowY: "scroll",
    margin: "20px"
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
    overflowY: "scroll"
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




function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
      <Container fluid className={classes.container}>
        <div className={classes.chatInfo}>
          <Typography variant="h3">
            Rooms
          </Typography>
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
            <Tab label="Item One"  />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four"  />
            <Tab label="Item Five"  />
          </Tabs>
          </div>
          <Typography variant="h4">Online Users</Typography>
          <div className={classes.users}>
            <OnlineUser />
            <OnlineUser />
            <OnlineUser />
            <OnlineUser />
          </div>
        </div>
        <div className={classes.chatWindow}>
          
        </div>
        <div className={classes.inputWrapper}>
          <form noValidate autoComplete="off">
          <TextField 
          label="Type a message"
          variant="outlined"
          color="primary"
          className={classes.inputField}
          />
          </form>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
          Send
          </Button>
        </div>
      </Container>

  );
}

export default App;
