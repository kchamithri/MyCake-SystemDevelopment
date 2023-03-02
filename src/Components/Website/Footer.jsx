import React from "react";
import { NavLink } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div style={{ marginTop: "70px" }}>
      <footer className="footer text-white ">
        <div className="container" mt="2">
          <footer className="py-5 pb-0">
            <div className="row">
              <div className="col-4">
                <h4 style={{ fontWeight: "bold" }}>MY CAKE</h4>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    mycake@gmail.com
                  </li>
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    076 3 456 789
                  </li>
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    No.23, Ashoka Gardens, Kiribathgoda{" "}
                  </li>
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    Sri Lanka
                  </li>
                </ul>
              </div>

              <div className="col-2">
                <h5 style={{ fontWeight: "bold" }}>Explore Us</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    <NavLink
                      to="./celebrationCakes"
                      className="nav-link p-0 text-white"
                    >
                      Celebration Cakes
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    <NavLink
                      to="./partyPacks"
                      className="nav-link p-0 text-white"
                    >
                      Party Packs
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    <NavLink to="./about" className="nav-link p-0 text-white">
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2" style={{ fontWeight: "bold" }}>
                    <NavLink
                      to="./register"
                      className="nav-link p-0 text-white"
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-2">
                <h5 style={{ fontWeight: "bold" }}>Follow Us</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <InstagramIcon />
                  </li>
                  <li className="nav-item mb-2">
                    <FacebookIcon />
                  </li>
                </ul>
              </div>
              <div className="col-4">
                <h5 style={{ fontWeight: "bold" }}>Payments</h5>
                <div className="d-flex justify-content-start align-items-center">
                  <a href="https://www.payhere.lk" target="_blank">
                    <img
                      src="https://www.payhere.lk/downloads/images/payhere_long_banner.png"
                      alt="PayHere"
                      width="400"
                    />
                  </a>
                </div>
              </div>

              <div className="d-flex justify-content-center pt-4 mt-3 border-top">
                <p>@2023 Copy rights reserved</p>
              </div>
            </div>
          </footer>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
