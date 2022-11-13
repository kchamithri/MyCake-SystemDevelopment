import React from "react";
import "../../Styles/Sidebar.css";

const SideBar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="d-flex align-items-center">
          <img src="Assets/mycakelogo.jpg" className="rounded-5 " alt="logo" />
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="#">Dashboard</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-line-chart" aria-hidden="true"></i>
          <a href="#">Analytics</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-plus-square-o"></i>
          <a href="#">Add Products</a>
        </div>

        <div className="sidebar__link">
          <i className="fa fa-archive"></i>
          <a href="#">Inventory</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-users"></i>
          <a href="#">Suppliers</a>
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-sign-out"></i>
          <a href="#">Log out</a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
