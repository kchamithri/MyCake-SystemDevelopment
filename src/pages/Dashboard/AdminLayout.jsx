import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../Components/Dashboard/AdminSideBar";
import DashboardContent from "../../Components/Dashboard/Dashboard";
import NavBar from "../../Components/Dashboard/NavBar";
import SideBar from "../../Components/Dashboard/SideBar";
import AddProducts from "./AddProducts";
import Analytics from "./Analytics";
import Inventory from "./Inventory";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    // <div className="container-fluid">
    //
    //     <div className="col-md-2 col-4" style={{ paddingLeft: "0px" }}>
    //       <SideBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    //     </div>
    //     <div className="col-md-10 col-12">
    //       <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>

    <div className="row">
      <div className="col-lg-2">
        <AdminSideBar />
      </div>
      <div className="col"></div>
    </div>
  );
};

export default AdminLayout;
