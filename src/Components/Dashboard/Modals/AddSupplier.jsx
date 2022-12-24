import swal from "@sweetalert/with-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

const AddSupplier = ({ handleModalClose }) => {
  const [validated, setValidated] = useState(false);
  const [supplier, setSupplier] = useState({
    name: "",
    company: "",
    contact: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, company, contact } = supplier;

    try {
      const res = await fetch("/admin/supplier/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          contact,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        swal("Success", "Supplier Added Successfully", "success", {
          button: false,
          timer: 1500,
        }).then((value) => {
          event.target.reset();
          handleModalClose();
        });
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Supplier Name</Form.Label>
          <Form.Control
            required
            type="text"
            autoFocus
            name="name"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please provide the Supplier Name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Company Name</Form.Label>

          <Form.Control
            required
            type="text"
            name="company"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Company.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            required
            type="text"
            name="contact"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Contact Number.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Stack direction="horizontal">
        <div className="ms-auto mt-1">
          <Button variant="info" type="submit">
            Add
          </Button>
        </div>
      </Stack>
    </Form>
  );
};

export default AddSupplier;
