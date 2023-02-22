import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/Dashboard/AdminLogin";
import AdminSideBar from "./Components/Dashboard/AdminSideBar";
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminLogout from "./Components/Dashboard/AdminLogout";
import Footer from "./Components/Website/Footer";
import Navbar from "./Components/Website/Navbar";
import Profile from "./Components/Website/Profile";
import Layout from "./Layout";
import Cart from "./pages/Cart";
import AddProducts from "./pages/Dashboard/AddProducts";
import AdminLayout from "./pages/Dashboard/AdminLayout";
import Analytics from "./pages/Dashboard/Analytics";
import Inventory from "./pages/Dashboard/Inventory";
import Orders from "./pages/Dashboard/Orders";
import Reports from "./pages/Dashboard/Reports";
import Settings from "./pages/Dashboard/Settings";
import Suppliers from "./pages/Dashboard/Suppliers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/website/About";
import CelebrationCake from "./pages/website/CelebrationCake";
import Checkout from "./pages/website/checkout/Checkout";
import Payment from "./pages/website/checkout/Payment";
import DesignAcake from "./pages/website/DesignAcake";
import Home from "./pages/website/Home";
import PartyPacks from "./pages/website/PartyPacks";
import ProtectedRoute from "./ProtectedRoute";
import "./Styles/LandingPage.css";
import UserLogout from "./Components/Website/UserLogout";

function App() {
  const [userauth, setUserauth] = useState(false);
  const [adminauth, setAdminauth] = useState(false);

  useEffect(() => {
    console.log(adminauth);
  }, [adminauth]);

  // const isLogged = async () => {
  //   try {
  //     const res = await fetch("/auth", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     if (res.status === 200) {
  //       // setAdminauth(true)
  //       setUserauth(true);
  //     }
  //     if (res.status === 401) {
  //       setAdminauth(false);
  //       setUserauth(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   isLogged();
  // }, []);

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
            <Route path="login" element={<Login setUserauth={setUserauth} />} />
            <Route path="register" element={<Register />} />
            <Route
              path="userLogout"
              element={<UserLogout setUserauth={setUserauth} />}
            />

            <Route
              path="cart"
              element={
                <ProtectedRoute userauth={userauth}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute userauth={userauth}>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminauth={adminauth}>
                <AdminSideBar />
              </ProtectedRoute>
            }
          >
            <Route index={true} element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="products" element={<AddProducts />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="settings" element={<Settings />} />
            <Route
              path="adminLogout"
              element={<AdminLogout setAdminauth={setAdminauth} />}
            />
          </Route>

          <Route
            path="/admin/login"
            element={<AdminLogin setAdminauth={setAdminauth} />}
          ></Route>
          {/* <Route path="/adminSidebar" element={<AdminSideBar />}></Route> */}

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
        {/*  */}
      </BrowserRouter>
    </>
  );
}

export default App;
