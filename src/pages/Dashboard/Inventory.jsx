import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import AddProductForm from "../../Components/Dashboard/AddProductForm";
import DashboardModal from "../../Components/Dashboard/DashboardModal";
import InventoryTable from "../../Components/Dashboard/InventoryTable";
import AddIngredients from "../../Components/Dashboard/Modals/AddIngredients";
import AddSupplier from "../../Components/Dashboard/Modals/AddSupplier";
import IngredientsListTable from "../../Components/Dashboard/Modals/IngredientsListTable";
import SuppliersListTable from "../../Components/Dashboard/Modals/SuppliersListTable";
import UpdateIngredients from "../../Components/Dashboard/Modals/UpdateIngredients";
import Table from "../../Components/Dashboard/Table";
import TransactionsTable from "../../Components/Dashboard/TransactionsTable";

const Inventory = () => {
  const [key, setKey] = useState("inventory");
  const [buttonName, setButtonName] = useState("add");
  const [addIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [editIngredientModalOpen, setEditIngredientModalOpen] = useState(false);
  const [IngredientsModalOpen, setIngredientsModalOpen] = useState(false);
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [editSupplierOpen, setEditSupplierOpen] = useState(false);
  const [suppliersModalOpen, setSuppliersModalOpen] = useState(false);

  const openAddIngredientModal = () => {
    setAddIngredientModalOpen(true);
  };
  const openIngredientEditModal = () => {
    setEditIngredientModalOpen(true);
  };
  const openIngredientsModal = () => {
    setIngredientsModalOpen(true);
  };

  const openAddSupplierModal = () => {
    setAddSupplierOpen(true);
  };
  const openSupplierEditModal = () => {
    setEditSupplierOpen(true);
  };
  const openSuppliersModal = () => {
    setSuppliersModalOpen(true);
  };

  const closeModal = () => {
    setAddIngredientModalOpen(false);
    setEditIngredientModalOpen(false);
    setIngredientsModalOpen(false);
    setAddSupplierOpen(false);
    setEditSupplierOpen(false);
    setSuppliersModalOpen(false);
  };

  return (
    <div className="mt-2">
      <DashboardModal
        title="Add Ingredients"
        show={addIngredientModalOpen}
        closeModal={closeModal}
      >
        {buttonName === "add" && key === "inventory" ? (
          <AddIngredients />
        ) : (
          <AddProductForm />
        )}
      </DashboardModal>
      <DashboardModal
        title="Update Ingredients"
        show={editIngredientModalOpen}
        closeModal={closeModal}
      >
        <UpdateIngredients />
      </DashboardModal>
      <IngredientsListTable
        show={IngredientsModalOpen}
        openEditModal={openIngredientEditModal}
        closeModal={closeModal}
      />
      <DashboardModal
        title="Add Supplier"
        show={addSupplierOpen}
        closeModal={closeModal}
      >
        <AddSupplier />
      </DashboardModal>
      <SuppliersListTable show={suppliersModalOpen} closeModal={closeModal} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
        justify
      >
        <Tab eventKey="inventory" title="Inventory">
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <InventoryTable tableName="Inventory" />
              </div>
              <div className="d-flex flex-column col-lg-2">
                <button
                  className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm m-1"
                  onClick={openAddIngredientModal}
                >
                  Add
                </button>
                <button className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm m-1">
                  Update
                </button>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-lg-10">
                <Table
                  color="green"
                  tableName="Ingredients List"
                  tabDisplay={false}
                  tabs={["Today", "Pending", "All"]}
                  openModal={openIngredientsModal}
                  displayButtons="none"
                  displaySearch="true"
                />
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="supplier" title="Supplier">
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <TransactionsTable />
              </div>
              <div className="d-flex flex-column col-lg-2">
                <button
                  className="btn btn-outline-dark ms-2 px-4 rounded-pill btn-sm m-1"
                  onClick={openAddSupplierModal}
                >
                  Add Supplier
                </button>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-lg-10">
                <Table
                  color="green"
                  tableName="Suppliers"
                  tabDisplay={false}
                  tabs={["Today", "Pending", "All"]}
                  openEditModal={openAddSupplierModal}
                  openModal={openSuppliersModal}
                  displayButtons="true"
                  displaySearch="true"
                />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Inventory;
