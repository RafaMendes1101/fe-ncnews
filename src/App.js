import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import Home from "./components/Home";
import { AppContext } from "./contexts/contexts";
import { useState } from "react";
import Topics from "./components/Topics";
import ArticleById from "./components/ArticleById";

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    avatar_url: "",
    name: "",
  });
  const [articleId, setArticleId] = useState("");

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{ currentUser, setCurrentUser, articleId, setArticleId }}
      >
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/articles" element={<Articles />} />
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/articles/:article_id" element={<ArticleById />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
