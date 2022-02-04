import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./component/LandingPage/LandingPage";
import Home from "./component/Home/Home";
import PokemonCreate from "./component/PokemonCreate/PokemonCreate";
import Detail from "./component/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/pokemons" element={<PokemonCreate />} />
          <Route path="/pokemon/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
