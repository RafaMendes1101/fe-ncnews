import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route to="/" element={<Articles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
