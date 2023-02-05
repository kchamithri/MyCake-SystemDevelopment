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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
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
        });
        event.target.reset();
      }
    } catch (error) {
      console.log("ERROR IS", error);
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
        <AddSupplier handleModalClose={handleModalClose} />
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
          onSubmit={handleSubmit}
          // id="addInventory"
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Inventory Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="inventoryType"
                onChange={handleInput}
              >
                <option>Select</option>
                {inventoryType.map((inventory) => {
                  return (
                    <option value={inventory._id}>{inventory.name}</option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide the Inventory Name.
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
              >
                <option>Select</option>
                {suppliers.map((supplier) => {
                  return <option value={supplier._id}>{supplier.name}</option>;
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide the Supplier Name.
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
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Date.
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
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Date.
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
                onChange={handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Quantity.
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
                onChange={handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the expenditure.
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
                onChange={handleInput}
              />
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
