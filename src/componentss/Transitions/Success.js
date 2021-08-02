import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import progressGif from "../../assets/images/progress.gif";
import Chatbox from "./../Chatbox";

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

function Success() {
  const classes = useStyles();
  const [oneLiner, setOneLiner] = useState(null);

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [displayComponent, setDisplayComponent] = useState(null);

  useEffect(() => {
    setOneLiner(oneLinerArray[getRandomInteger(0, oneLinerArray.length - 1)]);
    const timer = setTimeout(() => {
      setDisplayComponent("Chatbox");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const oneLinerArray = [
    "And BOOM! You are Connected!",
    "Connection Successful!",
    "Happy Chatting!",
    "Connected! Say Hello to your friend!",
  ];

  if (displayComponent === "Chatbox") {
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
