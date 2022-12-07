import swal from "@sweetalert/with-react";
import { Button } from "bootstrap";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, contact, email, password } = user;
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contact,
          email,
          password,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Already used details");
      } else {
        swal("Success", "Successfully Registered", "success", {
          button: false,
          timer: 1500,
        }).then((value) => {
          navigate("/celebrationcakes");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ReactNotifications />
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center form text-white  justify-content-center order-2">
            <h1 className="display-4 fw-bolder"> Hello </h1>
            <p className="lead text-center">Enter Your Details To Register</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/login"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Login
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <form onSubmit={handleSubmit} method="POST">
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="Kosala Chamithri"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                />
              </div>
              <div class="mb-3">
                <label for="contact" class="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="contact"
                  placeholder="Kosala Chamithri"
                  name="contact"
                  value={user.contact}
                  onChange={handleInput}
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="kc@gmail.com"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100 mt-4 rounded-pill"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
