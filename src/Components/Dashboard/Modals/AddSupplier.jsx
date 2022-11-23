import React from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const AddSupplier = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Supplier Name</Form.Label>
          <Form.Control required type="text" autoFocus />
          <Form.Control.Feedback type="invalid">
            Please provide the Supplier Name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Company Name</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback type="invalid">
            Please provide a Company.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Supply</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Select</option>
            <option value="1">Flour</option>
            <option value="2">Eggs</option>
            <option value="3">Sugar</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a Quantity.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Received Date</Form.Label>
          <Form.Control required type="date" />
          <Form.Control.Feedback type="invalid">
            Please provide a Date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control required type="date" />
          <Form.Control.Feedback type="invalid">
            Please provide a Date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default AddSupplier;
