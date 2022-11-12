import React from "react";
import "../../Styles/NavBar.css";

const NavBar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__right">
        <a href="#!">
          <i className="fa fa-bell" aria-hidden="true"></i>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
