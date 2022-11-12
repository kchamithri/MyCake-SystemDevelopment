import React from "react";
import { useState } from "react";
import DashboardContent from "../../Components/Dashboard/DashboardContent";
import NavBar from "../../Components/Dashboard/NavBar";
import SideBar from "../../Components/Dashboard/SideBar";
import "../../Styles/Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="container">
      <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <DashboardContent />
      <SideBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Dashboard;
