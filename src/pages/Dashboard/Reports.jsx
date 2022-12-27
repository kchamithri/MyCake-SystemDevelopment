import { Grid, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import BarChart from "../../Components/Dashboard/charts/BarChart";
import LineChart from "../../Components/Dashboard/charts/LineChart";

const Data = [
  {
    id: 1,
    year: "January",
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: "February",
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: "March",
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: "April",
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: "May",
    userGain: 4300,
    userLost: 234,
  },
];

const Reports = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    data: Data.map((data) => data.userGain),
    label: "Monthly Revenue",
    title: "Monthly Revenue(Rs.)",
  });

  return (
    <Grid
      container
      rowSpacing={{ xs: 2 }}
      columnSpacing={{ xs: 2 }}
      width="100%"
    >
      <Grid item xs={12} md={12}>
        <Paper elevation={1}>
          <LineChart />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        xs=4
      </Grid>
      <Grid item xs={4}>
        xs=4
      </Grid>
      <Grid item xs={8}>
        xs=8
      </Grid>
    </Grid>
  );
};

export default Reports;
