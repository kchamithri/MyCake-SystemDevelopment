import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "../../Styles/Dashboard.css";
import InventoryTable from "./InventoryTable";
import OrderDetailsModal from "./OrderDetailsModal";
import Table from "./Table";
import Tile from "./Tile";

const DashboardContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="container">
      <OrderDetailsModal show={modalOpen} closeModal={closeModal} />

      <div>
        <h1 className="fs-5 mb-1" style={{ color: "#2e4a66" }}>
          Hello Achini
        </h1>
        <p className="fs-6" style={{ color: "#a5aaad", fontWeight: "bold" }}>
          Welcome to the dashboard
        </p>
      </div>

      <div className="row row-cols-2 row-cols-lg-6">
        <Tile date="Today" title="Orders to dispatch" quantity="3" />
        <Tile date="Today" title="Orders Received" quantity="3" />
        <Tile date="Today" title="Customized Orders" quantity="3" />
        <Tile date="November" title="Total Orders" quantity="3" />
        <Tile date="November" title="Total Revenue" quantity="3" />
        <Tile title="Total customers" quantity="3" />
      </div>

      <div className="row my-2">
        <div className="col-lg-8 col-sm-12">
          <Table
            color="orange"
            tableName="Orders to dispatch"
            tabDisplay={true}
            tabs={["Today", "Pending", "All"]}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
        <div className="col-lg-4 col-sm-12">
          <InventoryTable tableName="Inventory" />
        </div>
      </div>

      <div className="row my-2">
        <div className="col-lg-8 col-sm-12">
          <Table
            color="brown"
            tableName="Customized Orders"
            tabDisplay={true}
            tabs={["Today", "Pending", "All"]}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
