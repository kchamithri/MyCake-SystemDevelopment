import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import moment from "moment";

const SalesReport = ({
  cakeData,
  partyPackData,
  labels,
  options,
  dataset,
  toValue,
  setToValue,
  fromValue,
  setFromValue,
  cCategoryData,
  cCategoryLabels,
  cFlavorData,
  cFlavorLabels,
  pCategoryData,
  pCategoryLabels,
  pFlavorData,
  pFlavorLabels,
}) => {
  return (
    <>
      <Grid container>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From"
                value={fromValue}
                onChange={(newValue) => {
                  setFromValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To"
                value={toValue}
                // disabled={dropDownSelect !== 1 ? true : false}
                onChange={(newValue) => {
                  setToValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12}>
        <Paper elevation={1}>
          <LineChart
            height="400px"
            // categories={labels}
            title="Total Statistics"
            series1="Cake"
            series1Data={cakeData}
            series2="Party Packs"
            series2Data={partyPackData}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={1}>
          <BarChart
            title="Cakes by category"
            categories={cCategoryLabels}
            series="Category"
            data={cCategoryData}
            // data={{
            //   title: "Cakes by category",
            //   labels: cCategoryLabels,
            //   label: "Category",
            //   data: cCategoryData,
            // }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={1}>
          <BarChart
            title="Cakes by Flavors"
            categories={cFlavorLabels}
            series="Flavor"
            data={cFlavorData}
            // data={{
            //   title: "Cakes by flavours",
            //   labels: cFlavorLabels,
            //   label: "Flavor",
            //   data: cFlavorData,
            // }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={1}>
          <BarChart
            title="Party packs by category"
            categories={pCategoryLabels}
            series="Category"
            data={pCategoryData}
            // data={{
            //   title: "Party packs by category",
            //   labels: pCategoryLabels,
            //   label: "Category",
            //   data: pCategoryData,
            // }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={1}>
          <BarChart
            title="Party packs by flavours"
            categories={pFlavorLabels}
            series="Flavor"
            data={pFlavorData}
            // data={{
            //   title: "Party packs by flavours",
            //   labels: pFlavorLabels,
            //   label: "Flavor",
            //   data: pFlavorData,
            // }}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default SalesReport;
