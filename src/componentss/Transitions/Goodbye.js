import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import progressGif from "../../assets/images/progress.gif";

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
  const oneLiner = "User '234534' Waved You a Good-Bye!";

  return (
    <div>
      <div className={classes.goodBye}>
        <img src={progressGif} alt="GoodBye!" />
      </div>
      <h3 className={classes.oneLiner}>{oneLiner}</h3>
    </div>
  );
}

export default Goodbye;
