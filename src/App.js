import "./Styles/LandingPage.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import CelebrationCake from "./pages/CelebrationCake";
import PartyPacks from "./pages/PartyPacks";
import DesignAcake from "./pages/DesignAcake";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
