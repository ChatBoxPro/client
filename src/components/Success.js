import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import progressGif from "../assets/images/progress.gif";
import Chatbox from "./Chatbox";

const useStyles = makeStyles((theme) => ({
  success: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    marginBottom: "5%",
  },
  oneLiner: {
    textAlign: "center",
  },
}));

// One liners to display on screen.
const oneLinerArray = [
  "Happy Chatting!",
  "Connection Successful!",
  "Boom! You are Connected!",
  "Say Hello to your friend!",
];

function Success() {
  const classes = useStyles();
  const [oneLiner, setOneLiner] = useState(oneLinerArray[0]);
  const [showChatbox, setShowChatbox] = useState(false);

  // Get random integer from min max values
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Select random string from One Liners Array
  // And show Chatbox after X seconds on mounting
  useEffect(() => {
    setOneLiner(oneLinerArray[getRandomInteger(0, oneLinerArray.length - 1)]);
    const timer = setTimeout(() => {
      setShowChatbox(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Display Success Message and Chatbox
  if (showChatbox) {
    return <Chatbox />;
  } else {
    return (
      <div>
        <div className={classes.success}>
          <img src={progressGif} alt="Success!" />
        </div>
        <h3 className={classes.oneLiner}>{oneLiner}</h3>
      </div>
    );
  }
}

export default Success;
