import swal from "@sweetalert/with-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

const AddSupplier = ({
  handleModalClose,
  supplierToEdit,
  buttonText,
  setShowForm,
}) => {
  const [validated, setValidated] = useState(false);
  const [supplier, setSupplier] = useState({
    name: supplierToEdit ? supplierToEdit.name : "",
    company: supplierToEdit ? supplierToEdit.company : "",
    contact: supplierToEdit ? supplierToEdit.contact : "",
  });
  //validations
  const [updateFormError, setUpdateFormError] = useState({
    nameErrorMsg: {
      message: "",
      isVisible: false,
    },
    companyErrorMsg: {
      message: "",
      isVisible: false,
    },
    contactErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validateProductInput = () => {
    let updateFormErrors = updateFormError;

    if (supplier.name.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Please Enter The Supplier Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(supplier.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),?":{}|<>]/.test(supplier.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (supplier.company.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        companyErrorMsg: {
          message: "Please Enter The Supplier Company",
          isVisible: true,
        },
      };
    } else if (
      /\d+/.test(supplier.company) ||
      /[!@#$%^&*(),?":{}|<>]/.test(supplier.company)
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        companyErrorMsg: {
          message: "Company Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        companyErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (supplier.contact.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Please Enter The Contact",
          isVisible: true,
        },
      };
    } else if (supplier.contact.length !== 10) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Should be 10 Digits Length",
          isVisible: true,
        },
      };
    } else if (
      /[a-zA-Z]/.test(supplier.contact) ||
      /[!@#$%^&*(),.?":{}|<>]/.test(supplier.contact)
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "Contact Can Be A Numeric Value Only",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        contactErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    setUpdateFormError(updateFormErrors);
    return (
      updateFormErrors.nameErrorMsg.isVisible ||
      updateFormErrors.companyErrorMsg.isVisible ||
      updateFormErrors.contactErrorMsg.isVisible
    );
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateProductInput();
    if (!validated) {
      if (supplierToEdit) {
        try {
          const res = await fetch("/admin/supplier/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: supplierToEdit._id,
              name: supplier.name,
              company: supplier.company,
              contact: supplier.contact,
            }),
          });
          if (res.status === 400 || !res) {
            window.alert("Invalid Credentials");
          } else {
            swal("Success", "Successfully Updated", "success", {
              button: false,
              timer: 1500,
            }).then((value) => {
              event.target.reset();
              setShowForm(false);
            });
          }
        } catch (error) {
          console.log("ERROR IS", error);
        }
      } else {
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
      }
    }
  };
  useEffect(() => {
    console.log(supplierToEdit);
  }, [supplierToEdit]);
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
            value={supplier.name}
            onChange={handleInput}
            isInvalid={updateFormError.nameErrorMsg.isVisible}
          />
          <Form.Control.Feedback type="invalid">
            {updateFormError.nameErrorMsg.message}
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
            value={supplier.company}
            onChange={handleInput}
            isInvalid={updateFormError.companyErrorMsg.isVisible}
          />
          <Form.Control.Feedback type="invalid">
            {updateFormError.companyErrorMsg.message}
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
            value={supplier.contact}
            onChange={handleInput}
            isInvalid={updateFormError.contactErrorMsg.isVisible}
          />
          <Form.Control.Feedback type="invalid">
            {updateFormError.contactErrorMsg.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Stack direction="horizontal">
        <div className="ms-auto mt-1">
          <Button variant="info" type="submit">
            {buttonText}
          </Button>
        </div>
      </Stack>
    </Form>
  );
};

export default AddSupplier;
