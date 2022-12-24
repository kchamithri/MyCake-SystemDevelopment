import {
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import OrdersTable from "../../Components/muiComponents/OrdersTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
      <div className="mt-2">
        <div className="row justify-content-end my-4">
          <Grid container spacing={2}>
            <Grid item xs={12} md={2} paddingRight={1}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  From
                </InputLabel>
                <Input
                  type="date"
                  id="deliverDate"
                  name="deliverDate"
                  // onChange={handleInput}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  }
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} paddingRight={1}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">To</InputLabel>
                <Input
                  type="date"
                  id="deliverDate"
                  name="deliverDate"
                  // onChange={handleInput}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  }
                  required
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              paddingRight={1}
              display="flex"
              alignItems="end"
              justifyContent="start"
            >
              <Button variant="outlined">Search</Button>
            </Grid>
          </Grid>
        </div>
        <OrdersTable rows={tableData} />
      </div>
    </>
  );
};

export default Orders;
