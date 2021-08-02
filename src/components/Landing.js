import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { SocketContext } from "../contexts/socket";
import { IconButton, Link, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

const useStyles = makeStyles((theme) => ({
  wrapCircleAroundIcon: {
    border: "solid 2px",
  },
}));

function Landing() {
  const classes = useStyles();
  const socket = useContext(SocketContext);

  // Global state & actions
  const { state, actions } = useContext(AppContext);
  const { clientId } = state;
  const { setClientId, setConnectionId, setFailureMessage, setChatRoom } =
    actions;

  // Local state
  const [displayClientId, setDisplayClientId] = useState(true);
  const [connectionIdValue, setConnectionIdValue] = useState("");

  // Socket functions in useEffect
  useEffect(() => {
    // Receive unique Id to connect with others
    socket.on("client-id-from-server", (id) => {
      setClientId(id);
    });

    // Clients tries connecting with a client
    socket.on("connection-details", (connectionDetails) => {
      if (connectionDetails.status) {
        setConnectionId(connectionDetails.connectionId);
        setChatRoom(connectionDetails.chatRoom);
      } else {
        setFailureMessage(connectionDetails.message);
      }
    });

    // Somebody connects with the client
    socket.on("somebody-connected-with-you", (connectionDetails) => {
      if (connectionDetails.status) {
        setConnectionId(connectionDetails.connectionId);
        setChatRoom(connectionDetails.chatRoom);
      }
    });
  }, []);

  // Submit Connection Id on entering 6 characters
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

  // Toggle View: Show Client Id & Enter Connection Id
  if (displayClientId) {
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
  } else {
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
  }
}

export default Landing;
