import React from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const UpdateProductForm = () => {
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
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      style={{ margin: "2% 5% " }}
    >
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom01">
          <Form.Label column lg={2}>
            Cake Name:
          </Form.Label>
          <Col lg={10}>
            <Form.Control required type="text" placeholder="Cake name" />
            <Form.Control.Feedback type="invalid">
              Please provide a Cake Name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom02">
          <Form.Label column lg={2}>
            Weight:
          </Form.Label>
          <Col lg={4}>
            <Form.Control required type="text" placeholder="kg" />
            <Form.Control.Feedback type="invalid">
              Please provide the weight.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom03">
          <Form.Label column lg={2}>
            Price:
          </Form.Label>
          <Col lg={4}>
            <Form.Control required type="text" placeholder="Rs." />
            <Form.Control.Feedback type="invalid">
              Please provide the Price.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom04">
          <Form.Label column lg={2}>
            Product Description:
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Product Description"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Row} controlId="formFile" className="mb-3">
          <Form.Label column lg={2}>
            Main Image:
          </Form.Label>
          <Col lg={10}>
            <Form.Control type="file" />
          </Col>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Row} controlId="formFileMultiple" className="mb-3">
          <Form.Label column lg={2}>
            Optional Images:
          </Form.Label>
          <Col lg={10}>
            <Form.Control type="file" multiple />
          </Col>
        </Form.Group>
      </Row>

      <Button type="submit">Update</Button>
    </Form>
  );
};

export default UpdateProductForm;
