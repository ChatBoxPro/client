import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import Success from "./Transitions/Success";
import Failure from "./Transitions/Failure";
import Chatbox from "./Chatbox";
import { IconButton, Link, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { SocketContext } from "../contexts/socket";

const useStyles = makeStyles((theme) => ({
  wrapCircleAroundIcon: {
    border: "solid 2px",
  },
}));

function Landing() {
  const classes = useStyles();
  const [displayClientId, setDisplayClientId] = useState(true);
  const socket = useContext(SocketContext);
  const { state, actions } = useContext(AppContext);
  const { clientId, connectionId, failureMessage } = state;
  const { setClientId, setConnectionId, setFailureMessage, setChatRoom } =
    actions;

  const [connectionIdValue, setConnectionIdValue] = useState("");

  useEffect(() => {
    // Receive unique Id to connect with others
    socket.on("pushClientId", (id) => {
      setClientId(id);
    });
    // Connects to connectionId
    socket.on("connection-details", (connectionDetails) => {
      if (connectionDetails.status) {
        setConnectionId(connectionDetails.connectionId);
        setChatRoom(connectionDetails.chatRoom);
      } else {
        setFailureMessage(connectionDetails.message);
      }
    });
    socket.on("somebody-connected-with-you", (connectionDetails) => {
      if (connectionDetails.status) {
        setConnectionId(connectionDetails.connectionId);
        setChatRoom(connectionDetails.chatRoom);
      }
    });
  }, []);

  const submitOnSixCharaters = (id) => {
    const regex = /^[0-9\b]+$/;
    if (id === "" || regex.test(id)) {
      setConnectionIdValue(id);
      if (id.length === 6 || id.length > 6) {
        socket.emit("join", id.substring(0, 6));
        setConnectionIdValue("");
      }
    }
  };

  if (displayClientId && !connectionId && !failureMessage) {
    return (
      <>
        <h2>Share Your ID</h2>
        <br />
        <h1>{clientId}</h1>
        <br />
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            setDisplayClientId(false);
          }}
        >
          Enter Friend's ID Instead?
        </Link>
      </>
    );
  } else if (!displayClientId && !connectionId && !failureMessage) {
    return (
      <>
        <h2>Your Friend's ID</h2>
        <br />
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={connectionIdValue}
          onChange={(event) => submitOnSixCharaters(event.target.value)}
        />
        <br />
        <br />
        <IconButton
          className={classes.wrapCircleAroundIcon}
          onClick={() => {
            setDisplayClientId(true);
          }}
        >
          <ArrowBackIosRoundedIcon fontSize="large" />
        </IconButton>
      </>
    );
  } else if (!!connectionId && !failureMessage) {
    return <Success />;
  } else if (!!failureMessage && !connectionId) {
    return <Failure message={failureMessage} />;
  } else if (!failureMessage && !!connectionId) {
    return <Chatbox />;
  }
}

export default Landing;
