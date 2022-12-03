import React from "react";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

const AddIngredients = (props) => {
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
          <Form.Label>Ingredient Name</Form.Label>
          <Form.Control required type="text" autoFocus />
          <Form.Control.Feedback type="invalid">
            Please provide the Ingredient Name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Ingredient Type</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback type="invalid">
            Please provide the Ingredient Type.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Initial Quantity</Form.Label>
          <Form.Control required type="text" size="sm" />
          <Form.Control.Feedback type="invalid">
            Please provide a Quantity.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Reorder Quantity</Form.Label>
          <Form.Control required type="text" size="sm" />
          <Form.Control.Feedback type="invalid">
            Please provide a Quantity.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Supplier</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Select</option>
            <option value="1">Sunil</option>
            <option value="2">Cargills</option>
            <option value="3">Cake shop</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide the Supplier Name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Received Date</Form.Label>
          <Form.Control required type="date" placeholder="Received Date" />
          <Form.Control.Feedback type="invalid">
            Please provide a Date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control required type="date" placeholder="Expiry Date" />
          <Form.Control.Feedback type="invalid">
            Please provide a Date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default AddIngredients;
