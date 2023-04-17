// import { Chart, LineElement, PointElement } from "chart.js";
// import React from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   BarElement,
//   CategoryScale,
//   Legend,
//   LinearScale,
//   Title,
//   Tooltip,
// } from "chart.js";
// import { Chart as ChartJS } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const BarChart = ({ data }) => {
//   // function dynamicColors() {
//   //   var r = Math.floor(Math.random() * 255);
//   //   var g = Math.floor(Math.random() * 255);
//   //   var b = Math.floor(Math.random() * 255);
//   //   return "rgba(" + r + "," + g + "," + b + ", 0.9)";
//   // }
//   // function poolColors(a) {
//   //   var pool = [];
//   //   for (let i = 0; i < a; i++) {
//   //     pool.push(dynamicColors());
//   //   }
//   //   return pool;
//   // }[
//   let colors = [
//     "rgba(75,192,192,1)",
//     "#EA047E",
//     "#913175",
//     "#E90064",
//     "#50AF95",
//     "#f3ba2f",
//     "#2a71d0",
//   ];

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }
//   return (
//     <div className="chart-container">
//       <Bar
//         data={{
//           labels: data.labels,
//           datasets: [
//             {
//               label: data.label,
//               data: data.data,
//               // backgroundColor: [
//               //   "rgba(75,192,192,1)",
//               //   "#EA047E",
//               //   "#913175",
//               //   "#E90064",
//               //   "#50AF95",
//               //   "#f3ba2f",
//               //   "#2a71d0",
//               // ],
//               backgroundColor: shuffleArray(colors),
//               borderColor: "black",
//               borderWidth: 1,
//             },
//           ],
//         }}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: data.title,
//             },
//             legend: {
//               display: false,
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default BarChart;

import { Paper } from "@mui/material";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = (props) => {
  return (
    <Paper elevation={1}>
      <Chart
        type="bar"
        width="100%"
        options={{
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
          chart: {
            id: "basic-bar",

            toolbar: {
              show: true,
              zoom: true,
              selection: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              offsetX: 0,
              offsetY: 0,
              // tools: {
              //   customIcons: [
              //     {
              //       icon: `<img src=${zoom} width="17">`,
              //       index: 2,
              //       title: "Zoom",
              //       class: "custom-icon",
              //       click: function (chart, options, e) {
              //         props.openModal();
              //       },
              //     },
              //   ],
              // },
            },
          },
          xaxis: {
            type: "category",
            categories: props.categories,
            labels: {
              rotate: -20,
              rotateAlways: false,
              hideOverlappingLabels: false,
              trim: true,
            },
          },
          yaxis: {
            showForNullSeries: false,
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              },
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
          plotOptions: {
            bar: {
              distributed: true,
              borderRadius: 5,
            },
          },
          legend: {
            show: true,
            customLegendItems: props.categories,
          },
        }}
        series={[
          {
            name: props.series,
            data: props.data,
          },
        ]}
      />
    </Paper>
  );
};

export default BarChart;
