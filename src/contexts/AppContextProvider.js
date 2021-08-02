import React, { useReducer } from "react";
import axios from "axios";
import ContextProvider from "./ContextProvider";
export const AppContext = React.createContext();

const actionTypes = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
  GET_CLIENT_ID: "GET_CLIENT_ID",
  SET_CLIENT_ID: "SET_CLIENT_ID",
  SET_CHAT_ROOM: "SET_CHAT_ROOM",
  SET_CONNECTION_ID: "SET_CONNECTION_ID",
  SET_DISPLAY_LOADING: "SET_DISPLAY_LOADING",
  SET_FAILURE_MESSAGE: "SET_FAILURE_MESSAGE",
  SET_RECEIVED_MESSAGE: "SET_RECEIVED_MESSAGE",
  RESET_GLOBAL_STATE: "RESET_GLOBAL_STATE",
};

const initialState = {
  clientId: "",
  clientMessage: "",
  connectionId: "",
  receivedMessage: "",
  defaultClientMessage: "",
  failureMessage: "",
  chatRoom: "",
  displayLoading: true,
};

const reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case actionTypes.SET_CONNECTION_ID:
      newState.connectionId = action.id;
      break;
    case actionTypes.SET_DISPLAY_LOADING:
      newState.displayLoading = action.value;
      break;
    case actionTypes.SET_CLIENT_ID:
      newState.clientId = action.id;
      break;
    case actionTypes.SET_FAILURE_MESSAGE:
      newState.failureMessage = action.message;
      break;
    case actionTypes.SET_CHAT_ROOM:
      newState.chatRoom = action.chatRoom;
      break;
    case actionTypes.SET_RECEIVED_MESSAGE:
      newState.receivedMessage = action.message;
      break;
    case actionTypes.RESET_GLOBAL_STATE:
      newState = { ...initialState, clientId: newState.clientId };
      break;
    default:
      return state;
  }
  return newState;
};

const useAction = (state, dispatch) => {
  return {
    connect: (id) => {
      dispatch({
        type: actionTypes.CONNECT,
        id: id,
      });
    },
    disconnect: () => {
      dispatch({
        type: actionTypes.DISCONNECT,
      });
    },
    setClientId: (id) => {
      dispatch({
        type: actionTypes.SET_CLIENT_ID,
        id: id,
      });
    },
    setChatRoom: (chatRoom) => {
      dispatch({
        type: actionTypes.SET_CHAT_ROOM,
        chatRoom,
      });
    },
    setConnectionId: (id) => {
      dispatch({
        type: actionTypes.SET_CONNECTION_ID,
        id: id,
      });
    },
    setDisplayLoading: (value) => {
      dispatch({
        type: actionTypes.SET_DISPLAY_LOADING,
        value: value,
      });
    },
    setFailureMessage: (message) => {
      dispatch({
        type: actionTypes.SET_FAILURE_MESSAGE,
        message: message,
      });
    },
    setReceivedMessage: (message) => {
      dispatch({
        type: actionTypes.SET_RECEIVED_MESSAGE,
        message: message,
      });
    },
    resetGlobalState: () => {
      dispatch({
        type: actionTypes.RESET_GLOBAL_STATE,
      });
    },
  };
};

const middleware = (params) => {
  const { state, dispatch, action, extensions } = params;
  const { axios } = extensions;
  switch (action.type) {
    case actionTypes.GET_CLIENT_ID:
      //   axios({
      //     method: "GET",
      //     url: "http://localhost:5000/getId",
      //     headers: {
      //       withCredentials: false,
      //       "Content-Type": "application/json",
      //       //Accept: "application/json",
      //       //Origin: "http://localhost:3000",
      //     },
      //   }).then((response) => {
      //     dispatch({
      //       type: actionTypes.SET_CLIENT_ID,
      //       id: response.id,
      //     });
      //   });
      break;
    case actionTypes.CONNECT:
      //   axios({
      //     method: "POST",
      //     url: `http://localhost:5000/connect` + action.id,
      //     headers: {
      //       withCredentials: false,
      //       "Content-Type": "application/json",
      //       //Accept: "application/json",
      //       //Origin: "http://localhost:3000",
      //     },
      //   }).then((response) => {
      //     dispatch({
      //       type: actionTypes.SET_CONNECTION_ID,
      //       id: response.id,
      //     });
      //    REMEMBER TO ASSIGN FALSE TO displayLoading state
      //   });
      break;
    case actionTypes.DISCONNECT:
      break;
    default:
      return dispatch(action);
  }
};

function AppContextProvider({ children }) {
  return (
    <ContextProvider
      initialState={initialState}
      Context={AppContext}
      useAction={useAction}
      reducers={reducer}
      middlewares={middleware}
      extensions={{
        axios: axios,
      }}
    >
      {children}
    </ContextProvider>
  );
}

export default AppContextProvider;
