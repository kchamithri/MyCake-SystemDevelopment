import { Card, FormHelperText, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import DashboardModal from "../DashboardModal";
import AddSupplier from "./AddSupplier";
import swal from "@sweetalert/with-react";
import AddInventoryType from "./AddInventoryType";

const UpdateStockForm = ({ handleUpdateFormShow, stockEditData }) => {
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
    supplierName: supplierName ? supplierName : "63a178e23ea432020d8f7deb",
    borrowedQuantity: "",
    expiryDate: "",
    expenditure: 0,
    status: status,
    description: "",
  });

  useEffect(() => {
    let inventoryName = "";
    let supplier = "";

    inventoryName = stockEditData.inventoryType._id;
    supplier = stockEditData.supplier._id;
    // stockEditData.supplierName.map((supplier) => (supplier = supplier._id));
    setInventoryName(inventoryName);
    setSupplierName(supplier);
    setStock({
      id: stockEditData ? stockEditData.data._id : "",
      inventoryType: inventoryName,
      supplierName: supplier,
      updatedDate: stockEditData.data.updatedDate,
      borrowedQuantity: stockEditData.data.borrowedQuantity,
      expiryDate: stockEditData.data.expiryDate,
      expenditure: stockEditData.data.expenditure,
      status: stockEditData.data.status,
      description: stockEditData.data.description,
    });
    setStatus(stockEditData.data.status);
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
            expenditure: "",
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
              <Form.Label>Inventory Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="inventoryType"
                onChange={(event) => {
                  setInventoryName(event.target.value);
                  handleInput(event);
                }}
                value={inventoryName}
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

            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Update Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                onChange={(event) => {
                  setStatus(event.target.value);
                  handleInput(event);
                }}
                value={status}
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
                  onChange={(event) => {
                    setSupplierName(event.target.value);
                    handleInput();
                  }}
                  value={supplierName}
                >
                  <option>Select</option>
                  {suppliers.map((supplier) => {
                    return (
                      <option value={supplier._id}>{supplier.name}</option>
                    );
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
                defaultValue={stockEditData.data.updatedDate}
                name="updatedDate"
                onChange={handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Date.
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
                  defaultValue={stockEditData.data.expiryDate}
                  onChange={handleInput}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a Date.
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
                defaultValue={stockEditData.data.borrowedQuantity}
                name="borrowedQuantity"
                onChange={handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Quantity.
              </Form.Control.Feedback>
            </Form.Group>
            {status === "Purchased" ? (
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Expenditure</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="sm"
                  placeholder="kg"
                  defaultValue={stockEditData.data.expenditure}
                  name="expenditure"
                  onChange={handleInput}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide the expenditure.
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
                defaultValue={stockEditData.data.description}
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

export default UpdateStockForm;
