import React from "react";
import { useState } from "react";
import DashboardContent from "../../Components/Dashboard/DashboardContent";
import NavBar from "../../Components/Dashboard/NavBar";
import SideBar from "../../Components/Dashboard/SideBar";
import AddProducts from "./AddProducts";
import Analytics from "./Analytics";
import Inventory from "./Inventory";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-4" style={{ paddingLeft: "0px" }}>
          <SideBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
        <div className="col-md-10 col-12">
          <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          {/* <DashboardContent /> */}
          {/* <Analytics /> */}
          {/* <AddProducts /> */}
          <Inventory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
