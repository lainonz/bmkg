import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gempa from "./components/Gempa";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="font-lexend">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gempa" element={<Gempa />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
