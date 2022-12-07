import swal from "@sweetalert/with-react";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
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
    const { email, password } = user;

    await fetch("/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 400 || !res) {
          window.alert("Invalid Credentials");
        } else {
          swal("Success", "Successfully Logged into the System", "success", {
            button: false,
            timer: 2000,
          }).then((value) => {
            navigate("/admin");
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((e) => {
        console.log("req completed");
      });
  };

  return (
    <div>
      <div className="container shadow" style={{ marginTop: "100px" }}>
        <div className="row ">
          <div className="col-md-5 d-flex flex-column align-items-center form text-white  justify-content-center">
            <h1 className="display-4 fw-bolder"> Welcome Back </h1>
            <p className="lead text-center">Enter Your Credentials To Login</p>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
            <form onSubmit={handleSubmit} method="POST">
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
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100 mt-4 rounded-pill"
              >
                Login
              </button>
            </form>
          </div>
          <div className="col-md-1">
            <div className="d-flex justify-content-center align-items-center mt-3">
              <img
                src="/Assets/mycakelogo.jpg"
                width="90px"
                className="rounded-5 "
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
