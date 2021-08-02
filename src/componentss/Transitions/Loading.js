import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import progressGif from "../../assets/images/progress.gif";
import { AppContext } from "../../contexts/AppContextProvider";
import Success from "./Success";
import Failure from "./Failure";

// const loadingImg = "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const useStyles = makeStyles((theme) => ({
  loadingSpinner: {
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

function Loading() {
  const classes = useStyles();
  const [oneLiner, setOneLiner] = useState(null);
  const { state, actions } = useContext(AppContext);
  const { connectionId, failureMessage } = state;

  const [displayComponent, setDisplayComponent] = useState(null);

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const oneLinerArray = [
    "Chatbox is live! It means whatever you type is shared instantly - Happy Chatting!",
    "We do not record any user activity. No Logs. No History. No Database.",
    "Welcome to the Next Generation chatbox. This is how it is supposed to be!",
    "Synchronous chat: Chatbox Pro, Asynchronous chat: Every other app you know.",
  ];

  useEffect(() => {
    setOneLiner(oneLinerArray[getRandomInteger(0, oneLinerArray.length - 1)]);
    const timer = setTimeout(() => {
      !!connectionId
        ? setDisplayComponent("Success")
        : setDisplayComponent("Failure");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (displayComponent === "Success") {
    return <Success />;
  } else if (displayComponent === "Failure") {
    return <Failure message={failureMessage} />;
  } else {
    return (
      <div>
        <div className={classes.loadingSpinner}>
          <img src={progressGif} alt="Connecting.." />
        </div>
        <h3 className={classes.oneLiner}>{oneLiner}</h3>
      </div>
    );
  }
}

export default Loading;
