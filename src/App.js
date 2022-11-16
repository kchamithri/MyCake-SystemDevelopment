import "./Styles/LandingPage.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cart from "./pages/Cart";
import CelebrationCake from "./pages/website/CelebrationCake";
import About from "./pages/website/About";
import Home from "./pages/website/Home";
import PartyPacks from "./pages/website/PartyPacks";
import DesignAcake from "./pages/website/DesignAcake";
import Navbar from "./Components/Website/Navbar";
import Footer from "./Components/Website/Footer";
import Checkout from "./pages/website/Checkout";
import AddProducts from "./pages/Dashboard/AddProducts";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/celebrationcakes" element={<CelebrationCake />} />
        <Route path="/partypacks" element={<PartyPacks />} />
        <Route path="/designacake" element={<DesignAcake />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/addProducts" element={<AddProducts />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
