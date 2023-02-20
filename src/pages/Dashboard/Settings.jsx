import swal from "@sweetalert/with-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Settings = () => {
  const [validated, setValidated] = useState(false);
  const [admin, setAdmin] = useState({
    name: localStorage.getItem("adminName")
      ? localStorage.getItem("adminName")
      : "",
    email: localStorage.getItem("adminEmail")
      ? localStorage.getItem("adminEmail")
      : "",
  });
  const [adminDetails, setAdminDetails] = useState({
    name: localStorage.getItem("adminName")
      ? localStorage.getItem("adminName")
      : "",
    email: localStorage.getItem("adminEmail")
      ? localStorage.getItem("adminEmail")
      : "",
  });
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  //validations
  const [userFormError, setUserFormError] = useState({
    nameErrorMsg: {
      message: "",
      isVisible: false,
    },
    emailErrorMsg: {
      message: "",
      isVisible: false,
    },
  });
  const [passwordFormError, setPasswordFormError] = useState({
    curPasswordErrorMsg: {
      message: "",
      isVisible: false,
    },
    newPasswordErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validateUserInput = () => {
    let updateFormErrors = userFormError;

    if (admin.name.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Please Enter The User Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(admin.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(admin.name)) {
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

    if (admin.email.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        emailErrorMsg: {
          message: "Please Enter The Email",
          isVisible: true,
        },
      };
    } else if (!/\S+@\S+\.\S+/.test(admin.email)) {
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

    setUserFormError(updateFormErrors);
    return (
      updateFormErrors.nameErrorMsg.isVisible ||
      updateFormErrors.emailErrorMsg.isVisible
    );
  };
  const validatePasswordInput = () => {
    let updateFormErrors = passwordFormError;

    if (password.currentPassword.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        curPasswordErrorMsg: {
          message: "Please Enter The Current Password",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        curPasswordErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (password.newPassword.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        newPasswordErrorMsg: {
          message: "Please Enter The New Password",
          isVisible: true,
        },
      };
    } else if (password.newPassword.length < 8) {
      updateFormErrors = {
        ...updateFormErrors,
        newPasswordErrorMsg: {
          message: "Password must be at least 8 characters",
          isVisible: true,
        },
      };
    } else if (!/[!@#$%^&*(),?":{}|<>]/.test(password.newPassword)) {
      updateFormErrors = {
        ...updateFormErrors,
        newPasswordErrorMsg: {
          message: "Password must at least contain A Special Character",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        newPasswordErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    setPasswordFormError(updateFormErrors);
    return (
      updateFormErrors.curPasswordErrorMsg.isVisible ||
      updateFormErrors.newPasswordErrorMsg.isVisible
    );
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    let validated = validateUserInput();
    if (!validated) {
      try {
        const res = await fetch("/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("adminId")
              ? localStorage.getItem("adminId")
              : "",
            name: admin.name,
            email: admin.email,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Invalid Credentials");
        } else {
          swal("Success", "Admin Updated Successfully", "success", {
            button: false,
            timer: 1500,
          });
          setAdminDetails(admin);
        }
      } catch (error) {
        console.log("ERROR IS", error);
      }
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    let validated = validatePasswordInput();
    console.log(validated);
    if (!validated) {
      try {
        const res = await fetch("/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("adminId")
              ? localStorage.getItem("adminId")
              : "",
            password: password.newPassword,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Invalid Credentials");
        } else {
          swal("Success", "Password Updated Successfully", "success", {
            button: false,
            timer: 1500,
          });
          event.target.reset();
        }
      } catch (error) {
        console.log("ERROR IS", error);
      }
    }
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setAdmin({ ...admin, [name]: value });
  };

  const handlePasswordInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setPassword({ ...password, [name]: value });
  };

  useEffect(() => {
    console.log(admin);
    console.log(password);
  }, [admin, password]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-1 col-sm-6">
            <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul style={{ listStyleType: "none" }}>
              <li>{adminDetails.name}</li>
              <li>{adminDetails.email}</li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 ">
            <div className="row">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Change Profile Information
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form
                      noValidate
                      validated={validated}
                      method="POST"
                      onSubmit={handleProfileSubmit}
                      enctype="multipart/form-data"
                    >
                      <Row className="mb-3">
                        <Form.Group
                          as={Row}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label column lg={3}>
                            Name:
                          </Form.Label>
                          <Col lg={9}>
                            <Form.Control
                              autoFocus
                              required
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={admin.name}
                              onChange={handleInput}
                              isInvalid={userFormError.nameErrorMsg.isVisible}
                            />
                            <Form.Control.Feedback type="invalid">
                              {userFormError.nameErrorMsg.message}
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Row}
                          md="6"
                          controlId="validationCustom02"
                        >
                          <Form.Label column lg={3}>
                            Email:
                          </Form.Label>
                          <Col lg={9}>
                            <Form.Control
                              required
                              type="text"
                              name="email"
                              value={admin.email}
                              placeholder="achini@gmail.com"
                              onChange={handleInput}
                              isInvalid={userFormError.emailErrorMsg.isVisible}
                            />
                            <Form.Control.Feedback type="invalid">
                              {userFormError.emailErrorMsg.message}
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </Row>

                      <Stack direction="horizontal">
                        <div className="bg-light border ms-auto">
                          <Button
                            variant="secondary"
                            type="submit"
                            // className={infoButton ? "disabled" : ""}
                          >
                            Save changes
                          </Button>
                        </div>
                      </Stack>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Change Password</Accordion.Header>
                  <Accordion.Body>
                    <Form
                      noValidate
                      validated={validated}
                      method="POST"
                      onSubmit={handlePasswordSubmit}
                      enctype="multipart/form-data"
                    >
                      <Row className="mb-3">
                        <Form.Group
                          as={Row}
                          md="6"
                          controlId="validationCustom02"
                        >
                          <Form.Label column lg={3}>
                            Current Password:
                          </Form.Label>
                          <Col lg={9}>
                            <Form.Control
                              required
                              type="password"
                              name="currentPassword"
                              onChange={handlePasswordInput}
                              isInvalid={
                                passwordFormError.curPasswordErrorMsg.isVisible
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {passwordFormError.curPasswordErrorMsg.message}
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Row}
                          md="6"
                          controlId="validationCustom02"
                        >
                          <Form.Label column lg={3}>
                            New Password:
                          </Form.Label>
                          <Col lg={9}>
                            <Form.Control
                              required
                              type="password"
                              name="newPassword"
                              onChange={handlePasswordInput}
                              isInvalid={
                                passwordFormError.newPasswordErrorMsg.isVisible
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {passwordFormError.newPasswordErrorMsg.message}
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </Row>
                      <Stack direction="horizontal">
                        <div className="bg-light border ms-auto">
                          <Button
                            variant="secondary"
                            type="submit"
                            // className={passwordButton ? "disable" : ""}
                          >
                            Save changes
                          </Button>
                        </div>
                      </Stack>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
