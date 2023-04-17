import { Card, FormHelperText, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import DashboardModal from "../DashboardModal";
import AddSupplier from "./AddSupplier";
import swal from "@sweetalert/with-react";
import AddInventoryType from "./AddInventoryType";

const AddIngredients = ({ handleFormShow }) => {
  const [validated, setValidated] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = React.useState(false);

  const [stock, setStock] = useState({
    inventoryType: "",
    updatedDate: "",
    supplierName: "",
    borrowedQuantity: "",
    expiryDate: "",
    status: "Purchased",
    expenditure: 0,
    description: "",
  });
  //validations
  const [updateFormError, setUpdateFormError] = useState({
    inventoryTypeErrorMsg: {
      message: "",
      isVisible: false,
    },
    supplierErrorMsg: {
      message: "",
      isVisible: false,
    },
    borrowedDateErrorMsg: {
      message: "",
      isVisible: false,
    },
    expiryDateErrorMsg: {
      message: "",
      isVisible: false,
    },
    quantityErrorMsg: {
      message: "",
      isVisible: false,
    },
    priceErrorMsg: {
      message: "",
      isVisible: false,
    },
    descriptionErrorMsg: {
      message: "",
      isVisible: false,
    },
  });
  const [typeError, setTypeError] = useState("");
  const [supplierError, setSupplierError] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [inventoryType, setInventoryType] = useState([]);

  useEffect(() => {
    fetch("/admin/supplier/get", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.suppliers);
        setSuppliers(data.suppliers);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, [modalOpen, handleFormShow]);

  useEffect(() => {
    fetch("/admin/inventory/type/get", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.inventory);
        setInventoryType(data.inventory);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, [inventoryModalOpen, handleFormShow]);

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setStock({ ...stock, [name]: value });
  };

  const validateProductInput = () => {
    let updateFormErrors = updateFormError;

    if (stock.inventoryType.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        inventoryTypeErrorMsg: {
          message: "Please Enter The Product Name",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        inventoryTypeErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (stock.supplierName.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        supplierErrorMsg: {
          message: "Please Enter The Product Name",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        supplierErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (stock.updatedDate.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        borrowedDateErrorMsg: {
          message: "Please Enter The Product Type",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        borrowedDateErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (stock.expiryDate.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        expiryDateErrorMsg: {
          message: "Please Enter The Product Flavor",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        expiryDateErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (stock.borrowedQuantity.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        quantityErrorMsg: {
          message: "Please Enter The Product Weight",
          isVisible: true,
        },
      };
    } else if (
      /[a-zA-Z]/.test(stock.borrowedQuantity) ||
      /[!@#$%^&*(),.?":{}|<>]/.test(stock.borrowedQuantity)
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        quantityErrorMsg: {
          message: "Product Weight Can Be A Numeric Value Only",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        quantityErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (stock.expenditure.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        priceErrorMsg: {
          message: "Please Enter The Product Price",
          isVisible: true,
        },
      };
    } else if (stock.expenditure === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        priceErrorMsg: {
          message: "Please Enter The Price",
          isVisible: true,
        },
      };
    } else if (
      /[a-zA-Z]/.test(stock.expenditure) ||
      /[!@#$%^&*(),.?":{}|<>]/.test(stock.expenditure)
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        priceErrorMsg: {
          message: "Product Price Can Be A Numeric Value Only",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        priceErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (stock.description.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        descriptionErrorMsg: {
          message: "Please Enter The Product Description",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        descriptionErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    setUpdateFormError(updateFormErrors);
    return (
      updateFormErrors.inventoryTypeErrorMsg.isVisible ||
      updateFormErrors.supplierErrorMsg.isVisible ||
      updateFormErrors.borrowedDateErrorMsg.isVisible ||
      updateFormErrors.expiryDateErrorMsg.isVisible ||
      updateFormErrors.quantityErrorMsg.isVisible ||
      updateFormErrors.priceErrorMsg.isVisible ||
      updateFormErrors.descriptionErrorMsg.isVisible
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateProductInput();
    const {
      inventoryType,
      updatedDate,
      supplierName,
      borrowedQuantity,
      expiryDate,
      status,
      expenditure,
      description,
    } = stock;

    if (!validated) {
      try {
        const res = await fetch("/admin/inventory/stock/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventoryType,
            updatedDate,
            supplierName,
            borrowedQuantity,
            expiryDate,
            status,
            expenditure: parseInt(expenditure),
            description,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Invalid Credentials");
        } else {
          swal("Success", "Stock Added Successfully", "success", {
            button: false,
            timer: 1500,
          }).then((value) => {
            event.target.reset();
            handleFormShow();
          });
        }
      } catch (error) {
        console.log("ERROR IS", error);
      }
    }
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleInventoryModalOpen = () => setInventoryModalOpen(true);
  const handleInventoryModalClose = () => setInventoryModalOpen(false);

  return (
    <>
      <DashboardModal
        title="Add Supplier"
        show={modalOpen}
        closeModal={handleModalClose}
      >
        <AddSupplier handleModalClose={handleModalClose} buttonText="Add" />
      </DashboardModal>

      <DashboardModal
        title="Add Inventory"
        show={inventoryModalOpen}
        closeModal={handleInventoryModalClose}
      >
        <AddInventoryType handleModalClose={handleInventoryModalClose} />
      </DashboardModal>
      <Card className="p-3">
        <Form
          noValidate
          validated={validated}
          method="POST"
          enctype="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Inventory Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="inventoryType"
                onChange={handleInput}
                value={stock.inventoryType}
                isInvalid={updateFormError.inventoryTypeErrorMsg.isVisible}
              >
                <option>Select</option>
                {inventoryType.map((inventory) => {
                  return (
                    <option value={inventory._id}>{inventory.name}</option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {updateFormError.inventoryTypeErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="col-lg-6 d-flex justify-content-start align-items-end ">
              <FormHelperText>
                <Tooltip title="Add">
                  <IconButton
                    color="primary"
                    onClick={handleInventoryModalOpen}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                Inventory Type not available? Click the + to add new inventory
              </FormHelperText>
            </div>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Supplier</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="supplierName"
                onChange={handleInput}
                value={stock.supplierName}
                isInvalid={updateFormError.supplierErrorMsg.isVisible}
              >
                <option>Select</option>
                {suppliers.map((supplier) => {
                  return <option value={supplier._id}>{supplier.name}</option>;
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {updateFormError.supplierErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="col-lg-6 d-flex justify-content-start align-items-end ">
              <FormHelperText>
                <Tooltip title="Add">
                  <IconButton color="primary" onClick={handleModalOpen}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                Supplier not available? Click the + to add new supplier
              </FormHelperText>
            </div>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Stock Borrowed Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Received Date"
                name="updatedDate"
                onChange={handleInput}
                value={stock.updatedDate}
                isInvalid={updateFormError.borrowedDateErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.borrowedDateErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label> Stock Expiry Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Expiry Date"
                name="expiryDate"
                onChange={handleInput}
                value={stock.expiryDate}
                isInvalid={updateFormError.expiryDateErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.expiryDateErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Quantity Added to Stock</Form.Label>
              <Form.Control
                required
                type="text"
                size="sm"
                placeholder="kg"
                name="borrowedQuantity"
                value={stock.borrowedQuantity}
                onChange={handleInput}
                isInvalid={updateFormError.quantityErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.quantityErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Expenditure(Rs.)</Form.Label>
              <Form.Control
                required
                type="text"
                size="sm"
                placeholder="kg"
                name="expenditure"
                value={stock.expenditure}
                onChange={handleInput}
                isInvalid={updateFormError.priceErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.priceErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                size="sm"
                placeholder="description"
                name="description"
                value={stock.description}
                onChange={handleInput}
                isInvalid={updateFormError.descriptionErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.descriptionErrorMsg.message}
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
      </Card>
    </>
  );
};

export default AddIngredients;
