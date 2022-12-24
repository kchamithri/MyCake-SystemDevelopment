import swal from "@sweetalert/with-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

const AddInventoryType = ({ handleModalClose }) => {
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState({
    name: "",
    reorderQuantity: "",
    total: 0,
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setType({ ...type, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, reorderQuantity, total } = type;

    try {
      const res = await fetch("/admin/inventory/type/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          reorderQuantity,
          total,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        swal("Success", "Inventory Type Added Successfully", "success", {
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
          <Form.Label>Inventory Type</Form.Label>
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
          <Form.Label>Reorder Quantity</Form.Label>

          <Form.Control
            required
            type="text"
            name="reorderQuantity"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Company.
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

export default AddInventoryType;
