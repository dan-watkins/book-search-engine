// Import ApolloClient, ApolloProvider, InMemoryCache from apollo/client//
import "./App.css";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

//set up client = new ApolloClient, then wrap Navbar and Outlet in ApolloProvider where client={client}//

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
