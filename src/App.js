import "./App.css";
import AppContextProvider from "./contexts/AppContextProvider";
import { SocketContext, socket } from "./contexts/socket";
import SiteContainer from "./components/SiteContainer";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <AppContextProvider>
        <SiteContainer />
      </AppContextProvider>
    </SocketContext.Provider>
  );
}

export default App;
