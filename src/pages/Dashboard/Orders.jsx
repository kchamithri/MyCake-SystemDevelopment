import {
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import OrdersTable from "../../Components/muiComponents/OrdersTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Orders = () => {
  function createData(
    id,
    foodItems,
    cusName,
    deliverPlace,
    deliverDate,
    orderPlacedDate,
    status
  ) {
    return {
      id,
      foodItems,
      cusName,
      deliverPlace,
      deliverDate,
      orderPlacedDate,
      status,
    };
  }
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [toValue, setToValue] = useState(null);
  const [fromValue, setFromValue] = useState(null);

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
        setOrders(data.orders);
        setTableData(
          data.orders.map((list) => {
            let name = list.firstName + " " + list.lastName;
            let orderPlacedOn = new Date(list.orderPlacedDate)
              .toISOString()
              .substring(0, 10);
            return createData(
              list._id,
              list.products,
              name,
              list.address,
              list.deliverDate,
              orderPlacedOn,
              list.status
            );
          })
        );
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, []);

  const handleSearch = () => {
    let fromDate = new Date(fromValue).toISOString().substring(0, 10);
    let toDate = new Date(toValue).toISOString().substring(0, 10);

    let filteredData = orders.filter(
      (order) =>
        fromDate < order.orderPlacedDate.substring(0, 10) &&
        order.orderPlacedDate.substring(0, 10) <= toDate
    );

    setTableData(
      filteredData.map((list) => {
        let name = list.firstName + " " + list.lastName;
        let orderPlacedOn = new Date(list.orderPlacedDate)
          .toISOString()
          .substring(0, 10);
        return createData(
          list._id,
          list.products,
          name,
          list.address,
          list.deliverDate,
          orderPlacedOn,
          list.status
        );
      })
    );
  };

  const handleReset = () => {
    setFromValue(null);
    setToValue(null);
    setTableData(
      orders.map((list) => {
        let name = list.firstName + " " + list.lastName;
        let orderPlacedOn = new Date(list.orderPlacedDate)
          .toISOString()
          .substring(0, 10);
        return createData(
          list._id,
          list.products,
          name,
          list.address,
          list.deliverDate,
          orderPlacedOn,
          list.status
        );
      })
    );
  };

  useEffect(() => {
    console.log(fromValue);

    console.log(new Date(toValue));
  }, [toValue, fromValue]);

  return (
    <>
      <div className="mt-2">
        <div className="row justify-content-end my-4">
          <Grid container direction="row">
            <Grid item xs={2.5}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From"
                    value={fromValue}
                    onChange={(newValue) => {
                      setFromValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={2.5}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To"
                    value={toValue}
                    // disabled={dropDownSelect !== 1 ? true : false}
                    onChange={(newValue) => {
                      setToValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              md={1}
              paddingRight={1}
              display="flex"
              alignItems="center"
              justifyContent="start"
            >
              <Button variant="outlined" onClick={handleSearch}>
                Search
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={1}
              paddingRight={1}
              display="flex"
              alignItems="center"
              justifyContent="start"
            >
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </div>
        <OrdersTable rows={tableData} />
      </div>
    </>
  );
};

export default Orders;
