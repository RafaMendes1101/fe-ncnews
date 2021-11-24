import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import Home from "./components/Home";
import { UserContext } from "./contexts/user";
import { useState } from "react";
import Topics from "./components/Topics";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    avatar_url: "",
    name: "",
  });
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/articles" element={<Articles />} />
            <Route path="/home" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
