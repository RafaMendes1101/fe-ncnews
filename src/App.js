import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import Home from "./components/Home";
import { UserContext } from "./contexts/user";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState({
    username: "",
    avatar_url: "",
    name: "",
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/articles" element={<Articles />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
