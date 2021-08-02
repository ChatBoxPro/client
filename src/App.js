import "./App.css";
// import Landing from "./componentss/Landing";
import AppContextProvider from "./contexts/AppContextProvider";
import { SocketContext, socket } from "./contexts/socket";
import SiteContainer from "./components/SiteContainer";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <AppContextProvider>
        {/* <Landing
          style={{
            backgroundColor: "blue",
            width: "100px",
            height: "100px",
          }}
        /> */}
        <SiteContainer />
      </AppContextProvider>
    </SocketContext.Provider>
  );
}

export default App;
