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
  const [modalData, setModalData] = useState({});
  const [allOrders, setAllOrders] = useState([]);
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
  const [totalOrdersCount, setTotalOrdersCount] = useState();
  const [totalOrdersMonth, setTotalOrdersMonth] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowInStock, setLowInStock] = useState([]);

  const openModal = (id) => {
    console.log(id);
    setModalData(allOrders.filter((data) => data._id === id)[0]);
    setModalOpen(true);
  };
  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const monthNames = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
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
    fetch("/admin/orders/get", {
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
        setAllOrders(data.orders);
        let month = new Date(today).getMonth();
        setTotalOrdersMonth(monthNames[month]);
        let totalCount = 0;
        let revenue = 0;
        data.orders.map((order) => {
          let orderPlacedMonth = new Date(order.orderPlacedDate).getMonth();
          if (orderPlacedMonth === month) {
            totalCount = totalCount + 1;
            order.products.map((products) => {
              revenue = revenue + parseInt(products.product.price);
            });
          }
        });
        setTotalOrdersCount(totalCount);
        setTotalRevenue(revenue);

        setTodayDispatchOrderData(
          data.orders
            .filter((item) => item.deliverDate === today)
            .map((list) => {
              let name = list.firstName + " " + list.lastName;
              return createData(
                list._id,
                list.products,
                list.senderName,
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
                list.senderName,
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
  }, [today]);

  useEffect(() => {
    fetch("/admin/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chart: "inventory",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        data.result.map((type) => {
          let obj = data.inventory.find(
            (inventory) => inventory.name === type.name
          );
          if (obj.reorderQuantity >= type.quantity) {
            lowInStock.push(type);
          }
        });
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, []);

  return (
    <>
      <DashboardModal
        title="Order Details"
        modalData={modalData}
        show={modalOpen}
        closeModal={closeModal}
      >
        <OrderDetailsModal modalData={modalData} />
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
            color="#CEEDC7"
          />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile
            date="Today"
            title="Orders Received"
            quantity={todayOrders}
            color="#C8FFD4"
          />
        </Grid>
        {/* <Grid item xs={6} md={6} lg={2}>
          <Tile date="Today" title="Customized Orders" quantity="3" />
        </Grid> */}
        <Grid item xs={6} md={6} lg={2}>
          <Tile
            date={totalOrdersMonth}
            title="Total Orders"
            quantity={totalOrdersCount}
            color="#CDF0EA"
          />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile
            date={totalOrdersMonth}
            title="Total Revenue"
            quantity={totalRevenue}
            color="#ABF0E9"
          />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Tile
            title="Low In Stock"
            quantity={lowInStock.length}
            color="#B9F3FC"
          />
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
