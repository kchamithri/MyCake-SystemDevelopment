import { Chart, LineElement, PointElement } from "chart.js";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Chart as ChartJS } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  // function dynamicColors() {
  //   var r = Math.floor(Math.random() * 255);
  //   var g = Math.floor(Math.random() * 255);
  //   var b = Math.floor(Math.random() * 255);
  //   return "rgba(" + r + "," + g + "," + b + ", 0.8)";
  // }
  // function poolColors(a) {
  //   var pool = [];
  //   for (let i = 0; i < a; i++) {
  //     pool.push(dynamicColors());
  //   }
  //   return pool;
  // }
  return (
    <div className="chart-container">
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              label: data.label,
              data: data.data,
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              // backgroundColor: poolColors(data.data.length),
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: data.title,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
