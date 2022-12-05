import React from "react";
import { useState } from "react";
import { Accordion, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [showPendingOrders, setShowPendingOrders] = useState(true);
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [infoButton, setInfoButton] = useState(false);
  const [passwordButton, setPasswordButton] = useState(true);

  const handleInfoSaveButton = () => {
    setInfoButton(true);
  };
  const handlePasswordSaveButton = () => {
    setPasswordButton(false);
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-1 col-sm-6">
            <i class="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul style={{ listStyleType: "none" }}>
              <li>Kosala Chamithri</li>
              <li>kosala@gmail.com</li>
              <li>0785643567</li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6 ">
            <ul style={{ listStyleType: "none", textAlign: "center" }}>
              <li className="h4"> Pending Orders</li>
              <li className="h4">1</li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6">
            <ul style={{ listStyleType: "none", textAlign: "center" }}>
              <li className="h4"> Delivered Orders</li>
              <li className="h4">2</li>
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
                    <li className="mb-2">23/11/2022 </li>
                    <li className="mb-2">12</li>
                    <li className="mb-2">Imasha Nanayakkara</li>
                    <li className="mb-2">0763456789</li>
                    <li className="mb-2">23/11/2022</li>
                    <li className="mb-2">Horana, Kalutara</li>
                    <li className="mb-2">Happy Birthday Imasha!!</li>
                    <li className="mb-2">4000</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {showDeliveredOrders ? (
            <div className="col-lg-8 col-sm-6">
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
                    <li className="mb-2">09/03/2022 </li>
                    <li className="mb-2">3</li>
                    <li className="mb-2">Kosala Chamithri</li>
                    <li className="mb-2">0763456789</li>
                    <li className="mb-2">12/03/2022</li>
                    <li className="mb-2">Horana, Kalutara</li>
                    <li className="mb-2">Happy Birthday Kosala!!</li>
                    <li className="mb-2">5000</li>
                  </ul>
                </div>
              </div>
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
                        // onSubmit={handleSubmit}
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
                                value="Kosala Chamithri"
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
                                disabled
                                type="text"
                                name="name"
                                placeholder="kosala@gmail.com"
                              />
                              <Form.Text id="passwordHelpBlock" muted>
                                <i
                                  class="fa fa-exclamation-circle"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                ></i>
                                Your email cannot be changed
                              </Form.Text>
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
                                value="0785643567"
                                placeholder="Contact"
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
                        // onSubmit={handleSubmit}
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
                                name="password"
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
                                name="password"
                                // onChange={handlePasswordSaveButton}
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
