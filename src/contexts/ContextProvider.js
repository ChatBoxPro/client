import React, { useReducer } from "react";

function ContextProvider(props) {
  const {
    initialState,
    Context,
    useAction,
    reducers,
    middlewares,
    extensions,
    children,
  } = props;

  const applyMiddleware = (state, dispatch, extensions) => (action) => {
    middlewares({ state, dispatch, action, extensions });
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const actions = useAction(
    state,
    applyMiddleware(state, dispatch, extensions)
  );

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  );
}

export default ContextProvider;
