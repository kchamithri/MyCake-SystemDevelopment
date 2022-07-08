import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light shadow pt-2">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto fs-5 mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Celebration Cakes
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Party Packs
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Design a Cake
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About Us
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-primary ms-2 px-4 rounded-pill">
              <i className="fa fa-user-plus me-2"></i> Sign in{" "}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
