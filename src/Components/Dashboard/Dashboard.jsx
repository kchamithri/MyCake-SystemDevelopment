import { Container, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "../../Styles/Dashboard.css";
import Offcanvas from "../Offcanvas";
import DashboardModal from "./DashboardModal";
import InventoryTable from "./InventoryTable";
import OrderDetailsModal from "./Modals/OrderDetailsModal";
import Table from "./Table";
import Tile from "./Tile";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <DashboardModal
        title="Order Details"
        show={modalOpen}
        closeModal={closeModal}
      >
        <OrderDetailsModal />
      </DashboardModal>

      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="Today" title="Orders to dispatch" quantity="3" />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="Today" title="Orders Received" quantity="3" />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="Today" title="Customized Orders" quantity="3" />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="November" title="Total Orders" quantity="3" />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="November" title="Total Revenue" quantity="3" />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile title="Total customers" quantity="3" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Table
            color="orange"
            tableName="Orders to dispatch"
            tabDisplay={true}
            tabs={["Today", "Pending"]}
            openModal={openModal}
            closeModal={closeModal}
            displayButtons="none"
          />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={6}>
          <Table
            color="brown"
            tableName="Customized Orders"
            tabDisplay={true}
            tabs={["Today", "Pending", "All"]}
            openModal={openModal}
            closeModal={closeModal}
            displayButtons="none"
          />
        </Grid> */}
        <Grid item xs={12} md={4} lg={6}>
          <InventoryTable tableName="Inventory" chartDisplay="none" />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
