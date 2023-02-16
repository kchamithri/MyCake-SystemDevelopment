import swal from "@sweetalert/with-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Settings = () => {
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

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
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
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
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
  }, [admin]);

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
                      // validated={validated}
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
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your Name.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Row}
                          md="6"
                          controlId="validationCustom01"
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
                            />
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
                      // validated={validated}
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
                              name="newPassword"
                              onChange={handlePasswordInput}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a Password.
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
                              name="currentPassword"
                              onChange={handlePasswordInput}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a Password.
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
