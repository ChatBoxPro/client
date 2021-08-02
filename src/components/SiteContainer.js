import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import Success from "./Success";
import Landing from "./Landing";
import Failure from "./Failure";

function SiteContainer() {
  const { state } = useContext(AppContext);
  const { connectionId, failureMessage } = state;

  if (!connectionId && !failureMessage) {
    return <Landing />;
  } else if (!!failureMessage) {
    return <Failure />;
  } else if (!!connectionId) {
    return <Success />;
  }
}

export default SiteContainer;
