import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/Dashboard/AdminLogin";
import AdminSideBar from "./Components/Dashboard/AdminSideBar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Footer from "./Components/Website/Footer";
import Navbar from "./Components/Website/Navbar";
import Profile from "./Components/Website/Profile";
import Layout from "./Layout";
import Cart from "./pages/Cart";
import AddProducts from "./pages/Dashboard/AddProducts";
import AdminLayout from "./pages/Dashboard/AdminLayout";
import Analytics from "./pages/Dashboard/Analytics";
import Inventory from "./pages/Dashboard/Inventory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/website/About";
import CelebrationCake from "./pages/website/CelebrationCake";
import Checkout from "./pages/website/Checkout";
import DesignAcake from "./pages/website/DesignAcake";
import Home from "./pages/website/Home";
import PartyPacks from "./pages/website/PartyPacks";
import "./Styles/LandingPage.css";

function App() {
  return (
    <>
      {/* */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index={true} element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="celebrationcakes" element={<CelebrationCake />} />
            <Route path="partypacks" element={<PartyPacks />} />
            <Route path="designacake" element={<DesignAcake />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<AdminSideBar />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="reports" element={<Analytics />} />
            <Route path="products" element={<AddProducts />} />
            <Route path="suppliers" element={<Analytics />} />
            <Route path="orders" element={<Analytics />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="settings" element={<Analytics />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route path="/adminSidebar" element={<AdminSideBar />}></Route>

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
        {/*  */}
      </BrowserRouter>
    </>
  );
}

export default App;
