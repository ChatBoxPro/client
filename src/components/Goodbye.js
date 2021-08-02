import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import progressGif from "./../assets/images/progress.gif";
import { AppContext } from "../contexts/AppContextProvider";

const useStyles = makeStyles((theme) => ({
  goodBye: {
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

function Goodbye() {
  const classes = useStyles();

  // Global state & actions
  const { state, actions } = useContext(AppContext);
  const { connectionId } = state;
  const { resetGlobalState } = actions;

  useEffect(() => {
    const timer = setTimeout(() => {
      resetGlobalState();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className={classes.goodBye}>
        <img src={progressGif} alt="GoodBye!" />
      </div>
      <h3 className={classes.oneLiner}>
        ID {connectionId} Just Waved You a Good-Bye!
      </h3>
    </div>
  );
}

export default Goodbye;
