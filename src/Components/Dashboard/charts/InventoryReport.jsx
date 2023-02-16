import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";

const InventoryReport = ({ inventoryData, inventoryLabels, lowInStock }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper elevation={1}>
          <PieChart
            inventoryData={inventoryData}
            inventoryLabels={inventoryLabels}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <div
          className="h6 mb-2 d-flex justify-content-center p-1"
          style={{ backgroundColor: "red", fontWeight: "bold" }}
        >
          Low in Stock
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: 650, maxHeight: 500 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow style={{ backgroundColor: "lightGreen" }}>
                <TableCell>Inventory Name</TableCell>
                <TableCell align="right">Remaining Stock&nbsp;(kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lowInStock
                ? lowInStock.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>

                      <TableCell align="right">{row.quantity}</TableCell>
                    </TableRow>
                  ))
                : "No low in Stocks"}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default InventoryReport;
