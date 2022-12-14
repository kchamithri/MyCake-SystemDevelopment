import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import OrdersTable from "../../Components/muiComponents/OrdersTable";

const Orders = () => {
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
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
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
        // setOrders(data.orders);
        setTableData(
          data.orders.map((list) => {
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
      <OrdersTable rows={tableData} />
    </>
  );
};

export default Orders;
