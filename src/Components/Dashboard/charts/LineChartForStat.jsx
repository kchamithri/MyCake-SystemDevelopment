import { Paper } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

const LineChartForStat = (props) => {
  console.log(props);
  return (
    <Paper elevation={1}>
      <Chart
        type="line"
        height={props.height}
        options={{
          chart: {
            id: "basic-bar",
            height: "200",
            toolbar: {
              show: props.isMobile && props.isMobile === true ? false : true,
              zoom: true,
              selection: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              offsetX: 0,
              offsetY: 0,
            },
          },
          zoom: {
            enabled: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: [5, 7, 5],
            curve: "straight",
            dashArray: [0, 8, 5],
          },
          xaxis: {
            categories: props.categories,
          },
          yaxis: {
            showForNullSeries: false,
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              },
            },
          },
          legend: {
            tooltipHoverFormatter: function (val, opts) {
              return (
                val +
                " - " +
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                ""
              );
            },
          },
          markers: {
            size: 5,
            hover: {
              sizeOffset: 6,
            },
          },
          title: {
            text: props.title,
            align: "left",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: undefined,
              color: "#263238",
            },
          },
          noData: {
            text: "No Data Available",
            align: "center",
            verticalAlign: "middle",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "black",
              fontSize: "14px",
              fontFamily: undefined,
            },
          },
        }}
        series={[
          {
            name: props.series1,
            data: props.series1Data,
          },
          {
            name: props.series2,
            data: props.series2Data,
          },
          {
            name: props.series3,
            data: props.series3Data,
          },
        ]}
      />
    </Paper>
  );
};

export default LineChartForStat;
