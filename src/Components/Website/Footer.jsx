import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer text-white ">
        <div className="container" mt="2">
          <footer className="py-5 pb-0">
            <div className="row">
              <div className="col-6">
                <h4>MY CAKE</h4>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">All around the country</li>
                  <li className="nav-item mb-2">Sri Lanka</li>
                </ul>
              </div>
              <div className="col-4">
                <h5>Admin</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">Kosala Chamithri</li>
                  <li className="nav-item mb-2">
                    <a to="#" className="nav-link p-0 text-white">
                      kosala@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-2">
                <h5>Contact Us</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <NavLink
                      to="./requestForm"
                      className="nav-link p-0 text-white"
                    >
                      Tel
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink
                      to="./tableNew"
                      className="nav-link p-0 text-white"
                    >
                      Address
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="d-flex justify-content-center pt-4 mt-3 border-top">
                <p>@2023 Copy right reserved</p>
              </div>
            </div>
          </footer>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
