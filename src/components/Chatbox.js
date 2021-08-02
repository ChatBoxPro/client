import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  TextField,
  Input,
  OutlinedInput,
} from "@material-ui/core/";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
// const thinkingImg = "https://loading.io/s/icon/lrdtah.svg";
import progressGif from "../assets/images/progress.gif";
import { SocketContext } from "../contexts/socket";
import Goodbye from "./Goodbye";

const useStyles = makeStyles((theme) => ({
  thinkingAnimation: {
    display: "flex",
    justifyContent: "center",
    height: "40vh",
    width: "40vh",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    marginBottom: "5%",
  },
  inputStyle: {
    fontFamily: "Open Sans",
    fontSize: "18.9px",
  },
  inputCenter: {
    textAlign: "center",
  },
}));

function Chatbox() {
  const classes = useStyles();

  // Socket Context
  const socket = useContext(SocketContext);

  // Global state & actions
  const { state, actions } = useContext(AppContext);
  const { clientId, connectionId, receivedMessage, chatRoom } = state;
  const { setReceivedMessage, resetGlobalState } = actions;

  // Local state
  const [clientMessage, setClientMessage] = useState("");
  const [disconnected, setDisconnected] = useState(false);

  // Send message as user types in Input Field.
  const sendMessage = (message) => {
    setClientMessage(message.substring(0, 300));
    const messageDetails = {
      roomName: chatRoom,
      message: message.substring(0, 300),
    };
    socket.emit("send-message", messageDetails);
  };

  const disconnect = () => {
    socket.emit("goodbye", {
      clientId,
      connectionId,
      roomName: chatRoom,
    });
    resetGlobalState();
  };

  // Set recieved message in global state
  useEffect(() => {
    // Receive unique Id to connect with others
    socket.on("receive-message", (message) => {
      setReceivedMessage(message);
    });

    // Connection Id initiates disconnection
    socket.on("goodbye", () => {
      setDisconnected(true);
    });
  }, []);

  if (disconnected) {
    return <Goodbye />;
  } else
    return (
      <div>
        <div>
          <span>
            {connectionId}&nbsp;
            <IconButton
              className={classes.wrapCircleAroundIcon}
              onClick={() => {
                disconnect(); //
              }}
            >
              <CancelRoundedIcon fontSize="large" />
            </IconButton>
          </span>
        </div>
        <div className={classes.horizontalCard}>
          {!!receivedMessage ? (
            <section>
              <h2>{receivedMessage}</h2>
            </section>
          ) : (
            <div className={classes.thinkingAnimation}>
              <img src={progressGif} alt="Thinking Image" />
            </div>
          )}
        </div>
        <div>
          <form noValidate autoComplete="off">
            <OutlinedInput
              placeholder="Start Typing"
              value={clientMessage}
              fullWidth
              multiline
              classes={{
                input: classes.inputCenter,
              }}
              onChange={(event) => sendMessage(event.target.value)}
            />
          </form>
        </div>
      </div>
    );
}

export default Chatbox;
