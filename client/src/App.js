import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./component/LandingPage/LandingPage";
import Home from "./component/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
