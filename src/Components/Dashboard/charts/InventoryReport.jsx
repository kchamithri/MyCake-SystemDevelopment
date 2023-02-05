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
import React from "react";
import PieChart from "./PieChart";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const InventoryReport = ({ inventoryData, inventoryLabels }) => {
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
        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: 650, maxHeight: 500 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Inventory Name</TableCell>
                <TableCell align="right">Remaining Stock&nbsp;(kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default InventoryReport;
