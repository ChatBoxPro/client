import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  TextField,
  Input,
  OutlinedInput,
} from "@material-ui/core/";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
const thinkingImg = "https://loading.io/s/icon/lrdtah.svg";

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
  const { state, actions } = useContext(AppContext);
  const { connectionId, receivedMessage } = state;
  const { disconnect } = actions;

  return (
    <div>
      <div>
        <span>
          {connectionId}&nbsp;
          <IconButton
            className={classes.wrapCircleAroundIcon}
            onClick={() => {
              disconnect();
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
            <img src={thinkingImg} alt="Thinking Image" />
          </div>
        )}
      </div>
      <div>
        <form noValidate autoComplete="off">
          <OutlinedInput
            classes={{
              input: classes.inputCenter,
            }}
            placeholder="Start Typing"
            fullWidth
            multiline
          />
        </form>
      </div>
    </div>
  );
}

export default Chatbox;
