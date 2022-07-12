import "./Styles/LandingPage.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import CelebrationCake from "./Components/CelebrationCake";
import PartyPacks from "./Components/PartyPacks";
import DesignAcake from "./Components/DesignAcake"
import Footer from "./Components/Footer";
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/celebrationcakes" element={<CelebrationCake />} />
        <Route path="/partypacks" element={<PartyPacks />} />
        <Route path="/designacake" element={<DesignAcake />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
