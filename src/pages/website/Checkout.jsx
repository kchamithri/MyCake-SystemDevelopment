import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const Checkout = () => {
  const [validated, setValidated] = useState(false);
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
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
            <Form.Control required type="text" placeholder="First name" />
            <Form.Control.Feedback type="invalid">
              Please provide your First Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control required type="text" placeholder="Last name" />
            <Form.Control.Feedback type="invalid">
              Please provide a Last Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Address.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid City.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" placeholder="Contact Number" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Contact Number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <h5>Delivery Information</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>Date to deliver</Form.Label>
            <Form.Control type="date" placeholder="Date to deliver" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Delivery Time</Form.Label>
            <Form.Control type="text" placeholder="Time to Deliver" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Time.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom08">
            <Form.Label>Personal Message</Form.Label>
            <Form.Control type="text" placeholder="Personal Message" />
          </Form.Group>
        </Row>
        <h5>Sender's Information</h5>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom09">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Name" />
            <Form.Control.Feedback type="invalid">
              Please provide your Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom11">
            <Form.Label>Contact</Form.Label>
            <Form.Control required type="text" placeholder="Contact" />
            <Form.Control.Feedback type="invalid">
              Please provide your Contact Number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom12">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="text" placeholder="Email" />
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
