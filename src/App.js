import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Favorites from "./pages/Favorites";

export const ThemeContext = createContext();

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <div className="App">
        <ThemeContext.Provider value={{ search, setSearch }}>
          <Header />
          <Routes>
            <Route path="/" element={<Comics />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/character/:id" element={<Character />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </ThemeContext.Provider>
      </div>
    </Router>
  );
}

export default App;
