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
  //validations
  const [userFormError, setUserFormError] = useState({
    nameErrorMsg: {
      message: "",
      isVisible: false,
    },
    contactErrorMsg: {
      message: "",
      isVisible: false,
    },
    emailErrorMsg: {
      message: "",
      isVisible: false,
    },
    passwordErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validateUserInput = () => {
    let updateFormErrors = userFormError;

    if (user.name.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Please Enter The Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(user.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(user.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (user.contact.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Please Enter The Contact Number",
          isVisible: true,
        },
      };
    } else if (/[a-zA-Z]/.test(user.contact)) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Can Contain Only Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(user.contact)) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else if (user.contact.length > 10 || user.contact.length < 10) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Should Be A 10 Digit Number",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (user.email.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        emailErrorMsg: {
          message: "Please Enter The Email",
          isVisible: true,
        },
      };
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      updateFormErrors = {
        ...updateFormErrors,
        emailErrorMsg: {
          message: "Please Enter A Valid Email",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        emailErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (user.password.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        passwordErrorMsg: {
          message: "Please Enter The Password",
          isVisible: true,
        },
      };
    } else if (user.password.length < 8) {
      updateFormErrors = {
        ...updateFormErrors,
        passwordErrorMsg: {
          message: "Password must be at least 8 characters",
          isVisible: true,
        },
      };
    } else if (!/[!@#$%^&*(),?":{}|<>]/.test(user.password)) {
      updateFormErrors = {
        ...updateFormErrors,
        passwordErrorMsg: {
          message: "Password must at least contain A Special Character",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        passwordErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }
    setUserFormError(updateFormErrors);
    return (
      updateFormErrors.emailErrorMsg.isVisible ||
      updateFormErrors.passwordErrorMsg.isVisible
    );
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateUserInput();

    const { name, contact, email, password } = user;
    if (!validated) {
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
            navigate("/login");
          });
        }
      } catch (error) {
        console.log(error);
      }
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
                {userFormError.nameErrorMsg.isVisible && (
                  <>
                    <div className="form-text text-danger">
                      <i
                        class="fa fa-exclamation-circle"
                        aria-hidden="true"
                        style={{ color: "red" }}
                      ></i>
                      {" " + userFormError.nameErrorMsg.message}
                    </div>
                  </>
                )}
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
                {userFormError.contactErrorMsg.isVisible && (
                  <div className="form-text text-danger">
                    <i
                      class="fa fa-exclamation-circle"
                      aria-hidden="true"
                      style={{ color: "red" }}
                    ></i>
                    {" " + userFormError.contactErrorMsg.message}
                  </div>
                )}
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
                {userFormError.emailErrorMsg.isVisible && (
                  <div className="form-text text-danger">
                    <i
                      class="fa fa-exclamation-circle"
                      aria-hidden="true"
                      style={{ color: "red" }}
                    ></i>
                    {" " + userFormError.emailErrorMsg.message}
                  </div>
                )}
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
                {userFormError.passwordErrorMsg.isVisible && (
                  <div className="form-text text-danger">
                    <i
                      class="fa fa-exclamation-circle"
                      aria-hidden="true"
                      style={{ color: "red" }}
                    ></i>
                    {" " + userFormError.passwordErrorMsg.message}
                  </div>
                )}
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
