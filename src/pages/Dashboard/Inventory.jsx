import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import AddProductForm from "../../Components/Dashboard/AddProductForm";
import DashboardModal from "../../Components/Dashboard/DashboardModal";
import InventoryTable from "../../Components/Dashboard/InventoryTable";
import AddIngredients from "../../Components/Dashboard/Modals/AddIngredients";
import IngredientsListTable from "../../Components/Dashboard/Modals/IngredientsListTable";
import UpdateIngredients from "../../Components/Dashboard/Modals/UpdateIngredients";
import Table from "../../Components/Dashboard/Table";

const Inventory = () => {
  const [key, setKey] = useState("inventory");
  const [buttonName, setButtonName] = useState("add");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const openAddModal = () => {
    setAddModalOpen(true);
  };
  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
  };

  return (
    <div className="mt-2">
      <DashboardModal
        title="Add Ingredients"
        show={addModalOpen}
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
        show={editModalOpen}
        closeModal={closeModal}
      >
        <UpdateIngredients />
      </DashboardModal>
      <IngredientsListTable />
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
                  onClick={openAddModal}
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
                  openEditModal={openEditModal}
                  displayButtons="true"
                  displaySearch="true"
                />
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="supplier" title="Supplier"></Tab>
      </Tabs>
    </div>
  );
};

export default Inventory;
