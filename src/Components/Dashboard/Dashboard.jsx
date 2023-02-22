import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
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
  const [todayDispatchCount, setTodayDispatchCount] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const current = new Date();
  const today =
    current.getFullYear() +
    "-" +
    ("0" + (current.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + current.getDate()).slice(-2);

  const [pendingOrdersData, setpendingOrdersData] = useState([]);
  const [todayDispatchOrderData, setTodayDispatchOrderData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function createData(
    id,
    foodItems,
    cusName,
    deliverPlace,
    deliverDate,
    deliverTime,
    status
  ) {
    return {
      id,
      foodItems,
      cusName,
      deliverPlace,
      deliverDate,
      deliverTime,
      status,
    };
  }

  useEffect(() => {
    console.log(today);
    fetch("/orders/get", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.orders);
        data.orders.map((order) => {
          console.log(order.orderPlacedDate);
        });

        setTodayDispatchOrderData(
          data.orders
            .filter((item) => item.deliverDate === today)
            .map((list) => {
              let name = list.firstName + " " + list.lastName;
              return createData(
                list._id,
                list.products,
                name,
                list.address,
                list.deliverDate,
                list.deliverTime,
                list.status
              );
            })
        );
        setTodayDispatchCount(
          data.orders.filter((item) => item.deliverDate === today).length
        );
        setTodayOrders(
          data.orders.filter(
            (item) => item.orderPlacedDate.split("T")[0] === today
          ).length
        );

        setpendingOrdersData(
          data.orders
            .filter((item) => item.deliverDate > today)
            .map((list) => {
              let name = list.firstName + " " + list.lastName;
              return createData(
                list._id,
                list.products,
                name,
                list.address,
                list.deliverDate,
                list.deliverTime,
                list.status
              );
            })
        );
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, []);

  return (
    <>
      <DashboardModal
        title="Order Details"
        show={modalOpen}
        closeModal={closeModal}
      >
        <OrderDetailsModal />
      </DashboardModal>

      <Grid
        container
        spacing={2}
        marginBottom={2}
        justifyContent="space-between"
      >
        <Grid item xs={6} md={6} lg={2}>
          <Tile
            date="Today"
            title="Orders to dispatch"
            quantity={todayDispatchCount}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="Today" title="Orders Received" quantity={todayOrders} />
        </Grid>
        {/* <Grid item xs={6} md={6} lg={2}>
          <Tile date="Today" title="Customized Orders" quantity="3" />
        </Grid> */}
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="January" title="Total Orders" quantity={totalOrders} />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile date="January" title="Total Revenue" quantity="Rs. 4500" />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile title="Total customers" quantity="5" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Table
            color="#439A97"
            tableName="Orders to dispatch"
            openModal={openModal}
            closeModal={closeModal}
            displayButtons="none"
            pendingOrdersData={pendingOrdersData}
            todayDispatchOrderData={todayDispatchOrderData}
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
        {/* <Grid item xs={12} md={4} lg={6}>
          <InventoryTable tableName="Inventory" chartDisplay="none" />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Dashboard;
