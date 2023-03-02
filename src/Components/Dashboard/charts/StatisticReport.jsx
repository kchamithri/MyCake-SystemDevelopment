import { PrecisionManufacturingTwoTone } from "@mui/icons-material";
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
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import LineChart from "./LineChart";
import LineChartForStat from "./LineChartForStat";

const StatisticReport = ({
  yearValue,
  setYearValue,
  profit,
  revenue,
  expense,
  labels,
}) => {
  return (
    <>
      <Grid container>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year"]}
                label="Year only"
                minDate={dayjs("2021")}
                value={yearValue}
                onChange={(newValue) => {
                  setYearValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} size="small" />
                )}
              />
            </LocalizationProvider>
          </FormControl>
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year", "month"]}
                label="Year and Month only"
                minDate={dayjs("2021")}
                value={yearMonthValue}
                onChange={(newValue) => {
                  setYearMonthValue(newValue);
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} size="small" />
                )}
              />
            </LocalizationProvider>
          </FormControl> */}
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper elevation={1}>
          <LineChartForStat
            height="400px"
            categories={labels}
            title="Total Statistics"
            series1="Revenue"
            series1Data={revenue}
            series2="Expense"
            series2Data={expense}
            series3="Profit"
            series3Data={profit}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default StatisticReport;
