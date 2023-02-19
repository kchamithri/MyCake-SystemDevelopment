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
  //validations
  const [updateFormError, setUpdateFormError] = useState({
    inventoryErrorMsg: {
      message: "",
      isVisible: false,
    },
    reorderQuanErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validateProductInput = () => {
    let updateFormErrors = updateFormError;

    if (type.name.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        inventoryErrorMsg: {
          message: "Please Enter The Inventory Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(type.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        inventoryErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(type.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        inventoryErrorMsg: {
          message: "Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        inventoryErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (type.reorderQuantity.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        reorderQuanErrorMsg: {
          message: "Please Enter The Reorder Quantity",
          isVisible: true,
        },
      };
    } else if (
      /[a-zA-Z]/.test(type.reorderQuantity) ||
      /[!@#$%^&*(),?":{}|<>]/.test(type.reorderQuantity)
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        reorderQuanErrorMsg: {
          message: "Reorder Quantity Can Be A Numeric Value Only",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        reorderQuanErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    setUpdateFormError(updateFormErrors);
    return (
      updateFormErrors.inventoryErrorMsg.isVisible ||
      updateFormErrors.reorderQuanErrorMsg.isVisible
    );
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setType({ ...type, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateProductInput();

    const { name, reorderQuantity, total } = type;
    if (!validated) {
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
            isInvalid={updateFormError.inventoryErrorMsg.isVisible}
          />
          <Form.Control.Feedback type="invalid">
            {updateFormError.inventoryErrorMsg.message}
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
            isInvalid={updateFormError.reorderQuanErrorMsg.isVisible}
          />
          <Form.Control.Feedback type="invalid">
            {updateFormError.reorderQuanErrorMsg.message}
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
