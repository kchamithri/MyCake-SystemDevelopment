// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ inventoryData, inventoryLabels }) => {
//   return (
//     <div style={{ height: "500px" }}>
//       <Pie
//         data={{
//           labels: inventoryLabels,
//           datasets: [
//             {
//               label: "Inventory Quantity",
//               data: inventoryData,
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(255, 206, 86, 0.2)",
//                 "rgba(75, 192, 192, 0.2)",
//                 "rgba(153, 102, 255, 0.2)",
//                 "rgba(255, 159, 64, 0.2)",
//               ],
//               borderColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//                 "rgba(75, 192, 192, 1)",
//                 "rgba(153, 102, 255, 1)",
//                 "rgba(255, 159, 64, 1)",
//               ],
//               borderWidth: 1,
//             },
//           ],
//         }}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Inventory Items",
//             },
//             legend: {
//               display: true,
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default PieChart;
import { Box, Paper } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

const PieChart = (props) => {
  return (
    <Paper elevation={1}>
      <Chart
        type="donut"
        options={{
          chart: {
            id: "basic-bar",
            toolbar: {
              show: true,
            },
          },
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
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
          plotOptions: {
            pie: {
              donut: {
                size: props.size,
              },
            },
          },
          labels: props.labels,
        }}
        series={props.series}
        width={props.width}
        height={props.height}
      />
    </Paper>
  );
};

export default PieChart;
