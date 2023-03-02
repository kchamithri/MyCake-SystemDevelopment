import { Card, FormHelperText, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import DashboardModal from "../DashboardModal";
import AddSupplier from "./AddSupplier";
import swal from "@sweetalert/with-react";
import AddInventoryType from "./AddInventoryType";
import { Navigate, useNavigate } from "react-router-dom";

const UpdateStockForm = ({
  handleUpdateFormShow,
  stockEditData,
  show,
  setShow,
  updateFormOpen,
  setUpdateFormOpen,
}) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = React.useState(false);
  const [status, setStatus] = useState("Order");
  const [inventoryName, setInventoryName] = useState("");
  const [supplierName, setSupplierName] = useState("");

  const [suppliers, setSuppliers] = useState([]);
  const [inventoryType, setInventoryType] = useState([]);

  const [stock, setStock] = useState({
    id: "",
    inventoryType: "",
    updatedDate: "",
    supplierName: "",
    borrowedQuantity: "",
    expiryDate: "",
    expenditure: 0,
    status: status,
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
  useEffect(() => {
    console.log(stockEditData);
  }, [stockEditData]);
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
    if (status === "Purchased") {
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

    if (status === "Purchased") {
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
    if (status === "Purchased") {
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

  useEffect(() => {
    let dataToUpdate = stockEditData.data;
    let inventoryName = stockEditData.inventoryType
      ? stockEditData.inventoryType._id
      : "";
    let supplier = stockEditData.supplier ? stockEditData.supplier._id : null;
    setStock({
      id: dataToUpdate ? dataToUpdate._id : "",
      inventoryType: stockEditData.inventoryType ? inventoryName : "",
      supplierName: stockEditData.supplier ? supplier : null,
      updatedDate: dataToUpdate.updatedDate ? dataToUpdate.updatedDate : "",
      borrowedQuantity: dataToUpdate.borrowedQuantity
        ? dataToUpdate.borrowedQuantity
        : "",
      expiryDate: dataToUpdate.expiryDate ? dataToUpdate.expiryDate : "",
      expenditure: dataToUpdate.expenditure ? dataToUpdate.expenditure : 0,
      status: dataToUpdate.status ? dataToUpdate.status : status,
      description: dataToUpdate.description ? dataToUpdate.description : "",
    });
    setStatus(dataToUpdate.status);
  }, [stockEditData]);

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
  }, [modalOpen]);

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
  }, [inventoryModalOpen]);

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateProductInput();
    console.log(event);
    console.log(stock.id);
    const {
      id,
      inventoryType,
      updatedDate,
      supplierName,
      borrowedQuantity,
      expiryDate,
      expenditure,
      status,
      description,
    } = stock;

    if (!validated) {
      try {
        const res = await fetch("/admin/inventory/stock/addStocks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            inventoryType,
            updatedDate,
            supplierName,
            borrowedQuantity,
            expiryDate,
            expenditure,
            status,
            description,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Invalid Credentials");
        } else {
          swal("Success", "Stock Updated  Successfully", "success", {
            button: false,
            timer: 1500,
          }).then((value) => {
            setUpdateFormOpen(!updateFormOpen);
            setShow(!show);
          });
          if (stock.id) {
            handleUpdateFormShow(stock.id);
            setStock({
              id: "",
              inventoryType: "",
              supplierName: "",
              updatedDate: "",
              borrowedQuantity: "",
              expiryDate: "",
              status: "",
              expenditure: 0,
              description: "",
            });

            event.target.reset();
          } else {
            event.target.reset();
          }
        }
      } catch (error) {
        console.log("ERROR IS", error);
      }
    }
  };

  useEffect(() => {
    console.log(stockEditData);
    console.log(status);
  }, [status, stockEditData]);

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
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Inventory Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="inventoryType"
                onChange={(event) => {
                  setInventoryName(event.target.value);
                  handleInput(event);
                }}
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

            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Update Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                onChange={(event) => {
                  setStatus(event.target.value);
                  handleInput(event);
                }}
                value={stock.status}
              >
                <option value="Order">Order</option>
                <option value="Purchased">Purchased</option>
                <option value="Discarded">Discarded</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide the Status.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {status === "Purchased" ? (
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Supplier</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="supplierName"
                  onChange={handleInput}
                  // setSupplierName(event.target.value);

                  value={stock.supplierName}
                  isInvalid={updateFormError.supplierErrorMsg.isVisible}
                >
                  <option>Select</option>
                  {suppliers.map((supplier) => {
                    return (
                      <option value={supplier._id}>{supplier.name}</option>
                    );
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
          ) : (
            ""
          )}

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label> Update Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Received Date"
                value={stock.updatedDate}
                name="updatedDate"
                onChange={handleInput}
                isInvalid={updateFormError.borrowedDateErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.borrowedDateErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>

            {status === "Purchased" ? (
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label> Stock Expiry Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Expiry Date"
                  name="expiryDate"
                  value={stock.expiryDate}
                  onChange={handleInput}
                  isInvalid={updateFormError.expiryDateErrorMsg.isVisible}
                />
                <Form.Control.Feedback type="invalid">
                  {updateFormError.expiryDateErrorMsg.message}
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              ""
            )}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Update Quantity </Form.Label>
              <Form.Control
                required
                type="text"
                size="sm"
                placeholder="kg"
                value={stock.borrowedQuantity}
                name="borrowedQuantity"
                onChange={handleInput}
                isInvalid={updateFormError.quantityErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.quantityErrorMsg.message}
              </Form.Control.Feedback>
            </Form.Group>
            {status === "Purchased" ? (
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Expenditure</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="sm"
                  placeholder="Rs."
                  value={stock.expenditure}
                  name="expenditure"
                  onChange={handleInput}
                  isInvalid={updateFormError.priceErrorMsg.isVisible}
                />
                <Form.Control.Feedback type="invalid">
                  {updateFormError.priceErrorMsg.message}
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              ""
            )}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                size="sm"
                placeholder="description"
                defaultValue={stock.description}
                name="description"
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

export default UpdateStockForm;
