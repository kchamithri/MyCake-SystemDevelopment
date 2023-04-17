import { styled } from "@mui/material/styles";
import { Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import BarChart from "../../Components/Dashboard/charts/BarChart";
import LineChart from "../../Components/Dashboard/charts/LineChart";
import PieChart from "../../Components/Dashboard/charts/PieChart";
import StatisticReport from "../../Components/Dashboard/charts/StatisticReport";
import SalesReport from "../../Components/Dashboard/charts/SalesReport";
import InventoryReport from "../../Components/Dashboard/charts/InventoryReport";
import { useEffect } from "react";
import dayjs from "dayjs";
import { months } from "moment/moment";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const Reports = () => {
  //overall statistics
  const [yearValue, setYearValue] = useState(dayjs("2023"));
  const [yearMonthValue, setYearMonthValue] = useState("");
  const [revenue, setRevenue] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [profit, setProfit] = useState([]);
  const [statisticDataset, setStatisticDataSet] = useState([
    {
      label: "Revenue",
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Profit",
      data: [],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Expenses",
      data: [],
      borderColor: "rgb(0, 252, 71)",
      backgroundColor: "rgba(0, 252, 71, 0.5)",
    },
  ]);
  const [monthLabels, setLabels] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  const today = new Date();
  console.log(today);

  //sales statistics
  const [toValue, setToValue] = useState("2023-04-17T18:58:25.593Z");
  const [fromValue, setFromValue] = useState("2023-03-17T18:58:25.593Z");
  const [partyPacks, setPartyPacks] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [salesLabels, setSalesLabels] = useState([]);
  const [cCategoryData, setcCategoryData] = useState([]);
  const [cCategoryLabels, setcCategoryLabels] = useState([]);
  const [cFlavorData, setcFlavorData] = useState([]);
  const [cFlavorLabels, setcFlavorLabels] = useState([]);
  const [pCategoryData, setpCategoryData] = useState([]);
  const [pCategoryLabels, setpCategoryLabels] = useState([]);
  const [pFlavorData, setpFlavorData] = useState([]);
  const [pFlavorLabels, setpFlavorLabels] = useState([]);
  const [inventoryLabels, setInventoryLabels] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [lowInStock, setLowInStock] = useState([]);

  const compareMonths = (a, b) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(a.month) - months.indexOf(b.month);
  };

  useEffect(() => {
    console.log(yearMonthValue);
  }, [yearMonthValue]);

  const statisticsReq = {
    year: yearValue.$y,
    yearAndMonth: yearMonthValue,
  };
  const salesReq = {
    fromDate: "",
    toDate: "",
    category: "", //cake/pastry
    type: "", //bdy,anniversary
    flavor: "",
  };

  const [revenueMonths, setRevenueMonths] = useState([]);
  const [expensesMonths, setExpensesMonths] = useState([]);

  //statistic data fetching
  useEffect(() => {
    fetch("/admin/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chart: "statistics",
        year: yearValue.$y,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        let revenueData = [];
        let expensesData = [];
        const sortedRevenueData = data.revenue.sort(compareMonths);
        sortedRevenueData.map((data) => {
          revenueMonths.push(data.month);
          revenueData.push(data.total.toString());
          // revenueData.push({
          //   x: data.month,
          //   y: data.total,
          // });
        });
        setRevenue(revenueData);
        const sortedexpensesData = data.expenses.sort(compareMonths);

        sortedexpensesData.map((data) => {
          expensesMonths.push(data.month);
          expensesData.push(data.total.toString());
          // expensesData.push({
          //   x: data.month,
          //   y: data.total,
          // });
        });
        setExpenses(expensesData);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
  }, [yearValue]);

  useEffect(() => {
    let i = 0;
    let profit = [];

    revenue.map((revenue) => {
      profit.push(revenue - parseInt(expenses[i]));
      i = i + 1;
    });
    setProfit({
      ...profit,
      months: expensesMonths,
      data: profit,
    });
  }, [yearValue, revenue]);

  useEffect(() => {
    console.log(revenue);
    console.log(expenses);
  }, [expenses, revenue, profit]);

  //sales data fetching
  let salesLabel = [];
  useEffect(() => {
    const lineChart = async () => {
      fetch("/admin/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chart: "sales",
          chartType: "lineChart",
          startDate: new Date(fromValue),
          endDate: new Date(toValue),
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log(data.result.length);
          if (data.result.length === 0) {
            setPartyPacks([]);
            setCakes([]);
          } else {
            data.result.map((data) => {
              if (data._id.category === "Party Packs") {
                setPartyPacks(
                  data.sales.map((obj) => {
                    return {
                      x: obj.date,
                      y: obj.count,
                    };
                  })
                );
              } else if (data._id.category === "Cake") {
                setCakes(
                  data.sales.map((obj) => {
                    return {
                      x: obj.date,
                      y: obj.count,
                    };
                  })
                );
              }
            });
          }
        })
        .catch((error) => {
          console.log("error fetching:", error);
        });
    };

    const barCharts = async () => {
      fetch("/admin/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chart: "sales",
          startDate: new Date(fromValue),
          endDate: new Date(toValue),
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          let cakeCategory = [];
          let cakeCategoryData = [];
          let cakeFlavors = [];
          let cakeFlavorData = [];

          let partyPacksCategory = [];
          let partyPacksCategoryData = [];
          let partyPacksFlavors = [];
          let partyPacksFlavorData = [];

          data.result.map((data) => {
            if (data._id === "Cake") {
              data.types.map((data) => {
                // if (!cakeCategory.includes(data.type)) {
                //   cakeCategory.push(data.type);
                //   cakeCategoryData.push(data.count);
                // }else{

                // }
                let categoryIndex = cakeCategory.indexOf(data.type);
                if (categoryIndex === -1) {
                  cakeCategory.push(data.type);
                  categoryIndex = cakeCategory.length - 1;
                  cakeCategoryData.push(data.count);
                } else {
                  let index = cakeCategoryData[categoryIndex];
                  cakeCategoryData[categoryIndex] =
                    cakeCategoryData[categoryIndex] + data.count;
                }

                data.flavors.map((data) => {
                  let flavorIndex = cakeFlavors.indexOf(data.flavor);
                  if (flavorIndex === -1) {
                    console.log(data.flavor);
                    cakeFlavors.push(data.flavor);
                    flavorIndex = cakeFlavors.length - 1;
                    cakeFlavorData.push(data.count);
                  } else {
                    let index = cakeFlavorData[flavorIndex];
                    cakeFlavorData[flavorIndex] =
                      cakeFlavorData[flavorIndex] + data.count;
                  }

                  //   console.log(data.count);
                  //   cakeFlavors.push(data.flavor);
                  //   cakeFlavorData.push(data.count);
                });
              });
            } else if (data._id === "Party Packs") {
              data.types.map((data) => {
                let categoryIndex = partyPacksCategory.indexOf(data.type);
                if (categoryIndex === -1) {
                  partyPacksCategory.push(data.type);
                  categoryIndex = partyPacksCategory.length - 1;
                  partyPacksCategoryData.push(data.count);
                } else {
                  let index = cakeCategoryData[categoryIndex];
                  partyPacksCategoryData[categoryIndex] =
                    partyPacksCategoryData[categoryIndex] + data.count;
                }

                // partyPacksCategory.push(data.type);
                // partyPacksCategoryData.push(data.count);

                data.flavors.map((data) => {
                  let flavorIndex = partyPacksFlavors.indexOf(data.flavor);
                  if (flavorIndex === -1) {
                    console.log(data.flavor);
                    partyPacksFlavors.push(data.flavor);
                    flavorIndex = partyPacksFlavors.length - 1;
                    partyPacksFlavorData.push(data.count);
                  } else {
                    let index = partyPacksFlavorData[flavorIndex];
                    partyPacksFlavorData[flavorIndex] =
                      partyPacksFlavorData[flavorIndex] + data.count;
                  }

                  // partyPacksFlavors.push(data.flavor);
                  // partyPacksFlavorData.push(data.count);
                });
              });
            }
          });
          setcCategoryLabels(cakeCategory);
          setcCategoryData(cakeCategoryData);
          setcFlavorLabels(cakeFlavors);
          setcFlavorData(cakeFlavorData);
          setpCategoryLabels(partyPacksCategory);
          setpCategoryData(partyPacksCategoryData);
          setpFlavorLabels(partyPacksFlavors);
          setpFlavorData(partyPacksFlavorData);
        })
        .catch((error) => {
          console.log("error fetching:", error);
        });
    };

    lineChart();
    barCharts();
  }, [toValue, fromValue]);

  useEffect(() => {
    const pieChart = async () => {
      fetch("/admin/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chart: "inventory",
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          let inventoryLabels = [];
          let inventoryData = [];

          data.result.map((data) => {
            inventoryLabels.push(data.name);
            inventoryData.push(data.quantity);
          });
          data.result.map((type) => {
            let obj = data.inventory.find(
              (inventory) => inventory.name === type.name
            );
            if (obj.reorderQuantity >= type.quantity) {
              lowInStock.push(type);
            }
          });
          setInventoryLabels(inventoryLabels);
          setInventoryData(inventoryData);
        })
        .catch((error) => {
          console.log("error fetching:", error);
        });
    };
    pieChart();
  }, []);

  useEffect(() => {
    console.log(cakes);
    console.log(partyPacks);
    console.log(pCategoryLabels);
    console.log(lowInStock);
  }, [
    cakes,
    partyPacks,
    cCategoryData,
    cCategoryLabels,
    cFlavorData,
    cFlavorLabels,
    pCategoryData,
    pCategoryLabels,
    pFlavorData,
    pFlavorLabels,
    lowInStock,
  ]);

  // useEffect(() => {
  //   setSalesDataSet([
  //     {
  //       label: "h",
  //       data: cakes.count,
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       labels: ["label1", "label3"],
  //       xAxisID: "x-axis-1",
  //     },
  //     {
  //       label: "l",
  //       data: partyPacks.count,
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       labels: ["label4", "label5", "label6"],
  //       xAxisID: "x-axis-2",
  //     },
  //   ]);

  // }, [cakes, partyPacks]);

  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: 2 }}
        columnSpacing={{ xs: 2 }}
        width="100%"
        marginBottom={4}
      >
        <Root>
          <Divider textAlign="left">Monthly Statistics</Divider>
        </Root>

        <StatisticReport
          yearValue={yearValue}
          setYearValue={setYearValue}
          profit={profit.data}
          revenue={revenue}
          expense={expenses}
          labels={revenueMonths}
        />
      </Grid>

      <Grid
        container
        rowSpacing={{ xs: 2 }}
        columnSpacing={{ xs: 2 }}
        width="100%"
        marginBottom={4}
      >
        <Root>
          <Divider textAlign="left">Sales</Divider>
        </Root>

        <SalesReport
          cakeData={cakes}
          partyPackData={partyPacks}
          // labels={cakes.date}
          toValue={toValue}
          setToValue={setToValue}
          fromValue={fromValue}
          setFromValue={setFromValue}
          cCategoryData={cCategoryData}
          cCategoryLabels={cCategoryLabels}
          cFlavorData={cFlavorData}
          cFlavorLabels={cFlavorLabels}
          pCategoryData={pCategoryData}
          pCategoryLabels={pCategoryLabels}
          pFlavorData={pFlavorData}
          pFlavorLabels={pFlavorLabels}
        />
      </Grid>

      <Grid
        container
        rowSpacing={{ xs: 2 }}
        columnSpacing={{ xs: 2 }}
        width="100%"
        marginBottom={4}
      >
        <Root>
          <Divider textAlign="left">Inventory</Divider>
        </Root>

        <InventoryReport
          inventoryData={inventoryData}
          inventoryLabels={inventoryLabels}
          lowInStock={lowInStock}
        />
      </Grid>
    </>
  );
};

export default Reports;
