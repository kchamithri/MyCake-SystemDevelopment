import React from "react";
import { NavLink } from "react-router-dom";
import "../../Styles/Sidebar.css";

const SideBar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="d-flex align-items-center">
          <img src="/Assets/mycakelogo.jpg" className="rounded-5 " alt="logo" />
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
          <NavLink to="">
            <i className="fa fa-home"></i>Dashboard
          </NavLink>
        </div>
        <div className="sidebar__link">
          <NavLink to="analytics">
            <i className="fa fa-line-chart" aria-hidden="true"></i> Analytics
          </NavLink>
        </div>
        <div className="sidebar__link">
          <NavLink to="products">
            <i className="fa fa-plus-square-o"></i> Products
          </NavLink>
        </div>

        <div className="sidebar__link">
          <NavLink to="inventory">
            <i className="fa fa-archive"></i>Inventory
          </NavLink>
        </div>
        <div className="sidebar__link">
          <NavLink to="suppliers">
            <i className="fa fa-users"></i> Suppliers
          </NavLink>
        </div>

        <div className="sidebar__link">
          <NavLink to="products">
            <i className="fa fa-plus-square-o"></i> Settings
          </NavLink>
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
