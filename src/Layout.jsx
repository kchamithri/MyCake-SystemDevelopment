import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Website/Footer";
import Navbar from "./Components/Website/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
