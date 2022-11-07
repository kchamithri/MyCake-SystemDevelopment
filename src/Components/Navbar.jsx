import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow pt-2">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto fs-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/celebrationcakes">
                  Celebration Cakes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/partypacks">
                  Party Packs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/designacake">
                  Design a Cake
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>
            </ul>
            <NavLink
              to="/login"
              className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
            >
              <i className="fa fa-user-plus me-2"></i> Sign in{" "}
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm"
            >
              <i className="fa fa-user-plus me-2"></i> Register{" "}
            </NavLink>
            <NavLink to="/cart">
              <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
