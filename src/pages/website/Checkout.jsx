import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import swal from "@sweetalert/with-react";

const Checkout = () => {
  const [validated, setValidated] = useState(false);
  const today = new Date();
  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    contact: "",
    deliverDate: "",
    deliverTime: "",
    message: "",
    senderName: "",
    senderContact: "",
    senderEmail: "",
    orderPlacedDate: today,
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      address,
      city,
      contact,
      deliverDate,
      deliverTime,
      message,
      senderName,
      senderContact,
      senderEmail,
      orderPlacedDate,
    } = order;

    try {
      const res = await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          city,
          contact,
          deliverDate,
          deliverTime,
          message,
          senderName,
          senderContact,
          senderEmail,
          orderPlacedDate,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        swal("Success", "Successfully Added", "success", {
          button: false,
          timer: 1500,
        });
        console.log(event.target);
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
  };

  return (
    <Container className="mt-3 border border-darker ">
      <h4 style={{ fontFamily: "monospace", fontSize: "20px" }}>
        Please provide your Order Details
      </h4>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ margin: "2% 5% " }}
      >
        <h5>Contact Details</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="firstName"
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your First Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name="lastName"
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Last Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              required
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Address.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              required
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid City.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact Number"
              name="contact"
              onChange={handleInput}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Contact Number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <h5>Delivery Information</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>Date to deliver</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date to deliver"
              name="deliverDate"
              onChange={handleInput}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Delivery Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Time to Deliver"
              name="deliverTime"
              onChange={handleInput}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Time.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom08">
            <Form.Label>Personal Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Personal Message"
              name="message"
              onChange={handleInput}
            />
          </Form.Group>
        </Row>
        <h5>Sender's Information</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom09">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              name="senderName"
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom11">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Contact"
              name="senderContact"
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your Contact Number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom12">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Email"
              name="senderEmail"
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide your Email.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Proceed</Button>
      </Form>
    </Container>
  );
};

export default Checkout;
