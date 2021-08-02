import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import progressGif from "./../assets/images/progress.gif";

const useStyles = makeStyles((theme) => ({
  failed: {
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

function Failure({ message }) {
  const classes = useStyles();
  const [countDown, setCountDown] = useState(4);

  // Global state & actions
  const { state, actions } = useContext(AppContext);
  const { failureMessage } = state;
  const { setFailureMessage } = actions;

  // Decrement countdown state on screen
  // Before redirecting back to landing
  useEffect(() => {
    const decrement = setTimeout(() => {
      setCountDown(countDown - 1);
      if (countDown - 1 === 0) {
        setFailureMessage("");
      }
    }, 1000);
    return () => clearTimeout(decrement);
  }, [countDown]);

  return (
    <div>
      <div className={classes.failed}>
        <img src={progressGif} alt="Failed!" />
      </div>
      <h3 className={classes.oneLiner}>{failureMessage}</h3>
      <h4 className={classes.oneLiner}>Going back in {countDown} seconds!</h4>
    </div>
  );
}

export default Failure;
