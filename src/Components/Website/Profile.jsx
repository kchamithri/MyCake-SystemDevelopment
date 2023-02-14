import swal from "@sweetalert/with-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [showPendingOrders, setShowPendingOrders] = useState(true);
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [infoButton, setInfoButton] = useState(false);
  const [passwordButton, setPasswordButton] = useState(true);
  const [pendingOrdersData, setpendingOrdersData] = useState([]);
  const [dispatchedOrdersData, setdispatchedOrdersData] = useState([]);

  const [user, setUser] = useState({
    name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    contact: localStorage.getItem("contact")
      ? localStorage.getItem("contact")
      : "",
  });
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [userDetails, setUserDetails] = useState({
    name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    contact: localStorage.getItem("contact")
      ? localStorage.getItem("contact")
      : "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const handlePasswordInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setPassword({ ...password, [name]: value });
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("userId")
            ? localStorage.getItem("userId")
            : "",
          name: user.name,
          email: user.email,
          contact: user.contact,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        setUserDetails(user);
        swal("Success", "User Updated Successfully", "success", {
          button: false,
          timer: 1500,
        });
        event.target.reset();
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
  };
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("userId")
            ? localStorage.getItem("userId")
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

  useEffect(() => {
    fetch("/orders/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        let pendingOrders = [];
        let dispatchedOrders = [];
        data.orders.map((order) => {
          if (order.status === "Pending") {
            pendingOrders.push(order);
          } else {
            dispatchedOrders.push(order);
          }
        });

        setpendingOrdersData(pendingOrders);
        setdispatchedOrdersData(dispatchedOrders);
        console.log(data.orders);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, []);

  useEffect(() => {
    console.log(pendingOrdersData);
  }, [pendingOrdersData, dispatchedOrdersData]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-1 col-sm-6">
            <i class="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul style={{ listStyleType: "none" }}>
              <li>{userDetails.name}</li>
              <li>{userDetails.email}</li>
              <li>{userDetails.contact}</li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6 ">
            <ul style={{ listStyleType: "none", textAlign: "center" }}>
              <li className="h4"> Pending Orders</li>
              <li className="h4">{pendingOrdersData.length}</li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6">
            <ul style={{ listStyleType: "none", textAlign: "center" }}>
              <li className="h4"> Delivered Orders</li>
              <li className="h4">{dispatchedOrdersData.length}</li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-4 col-sm-6">
            <div class="list-group">
              <button
                type="button"
                className={
                  showPendingOrders
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                aria-current="true"
                onClick={() => {
                  setShowPendingOrders(true);
                  setShowDeliveredOrders(false);
                  setShowSettings(false);
                }}
              >
                Pending Orders
              </button>
              <button
                type="button"
                className={
                  showDeliveredOrders
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                onClick={() => {
                  setShowDeliveredOrders(true);
                  setShowPendingOrders(false);
                  setShowSettings(false);
                }}
              >
                Delivered Orders
              </button>
              <button
                type="button"
                className={
                  showSettings
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                aria-current="true"
                onClick={() => {
                  setShowSettings(true);
                  setShowPendingOrders(false);
                  setShowDeliveredOrders(false);
                }}
              >
                Settings
              </button>
            </div>
          </div>
          {showPendingOrders ? (
            <div className="col-lg-8 col-sm-6">
              {pendingOrdersData.map((order) => {
                return (
                  <div className="row">
                    <div className="col-lg-3">
                      <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                        <li className="mb-2"> Order Placed On: </li>
                        <li className="mb-2">Order Number:</li>
                        <li className="mb-2">Recepient:</li>
                        <li className="mb-2">Recepient Contact:</li>
                        <li className="mb-2">Delivery Date:</li>
                        <li className="mb-2">Delivery Address:</li>
                        <li className="mb-2">Delivery Message:</li>
                        <li className="mb-2">Total(Rs):</li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                        <li className="mb-2">{order.orderPlacedDate} </li>
                        <li className="mb-2">{order._id}</li>
                        <li className="mb-2">
                          {order.firstName + "" + order.lastName}
                        </li>
                        <li className="mb-2">{order.contact}</li>
                        <li className="mb-2">{order.deliverDate}</li>
                        <li className="mb-2">{order.address}</li>
                        <li className="mb-2">{order.message}</li>
                        <li className="mb-2">Rs. 4000</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {showDeliveredOrders ? (
            <div className="col-lg-8 col-sm-6">
              {dispatchedOrdersData.map((order) => {
                return (
                  <div className="row">
                    <div className="col-lg-3">
                      <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                        <li className="mb-2"> Order Placed On: </li>
                        <li className="mb-2">Order Number:</li>
                        <li className="mb-2">Recepient:</li>
                        <li className="mb-2">Recepient Contact:</li>
                        <li className="mb-2">Delivery Date:</li>
                        <li className="mb-2">Delivery Address:</li>
                        <li className="mb-2">Delivery Message:</li>
                        <li className="mb-2">Total(Rs):</li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                        <li className="mb-2">{order.orderPlacedDate} </li>
                        <li className="mb-2">{order._id}</li>
                        <li className="mb-2">
                          {order.firstName + "" + order.lastName}
                        </li>
                        <li className="mb-2">{order.contact}</li>
                        <li className="mb-2">{order.deliverDate}</li>
                        <li className="mb-2">{order.address}</li>
                        <li className="mb-2">{order.message}</li>
                        <li className="mb-2">Rs. 4000</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {showSettings ? (
            <div className="col-lg-8 col-sm-6">
              <div className="row" style={{ margin: "0% 2% " }}>
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
                                value={user.name}
                                onChange={handleInput}
                                placeholder="Name"
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
                                value={user.email}
                                onChange={handleInput}
                                placeholder="kosala@gmail.com"
                              />
                              {/* <Form.Text id="passwordHelpBlock" muted>
                                <i
                                  class="fa fa-exclamation-circle"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                ></i>
                                Your email cannot be changed
                              </Form.Text> */}
                            </Col>
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Row}
                            md="6"
                            controlId="validationCustom03"
                          >
                            <Form.Label column lg={3}>
                              Contact Number:
                            </Form.Label>
                            <Col lg={9}>
                              <Form.Control
                                required
                                type="text"
                                name="contact"
                                placeholder="Contact"
                                value={user.contact}
                                onChange={handleInput}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide the contact number.
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
                                name="currentPassword"
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
                                name="newPassword"
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
