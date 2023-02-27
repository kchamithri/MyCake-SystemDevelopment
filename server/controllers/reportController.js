import Payment from "../models/paymentSchema.js";
import Stock from "../models/stockSchema.js";
import Orders from "../models/orderSchema.js";
import Inventory from "../models/inventorySchema.js";

export const Report = async (req, res) => {
  console.log(req.body);
  const monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  if (req.body.chart === "statistics") {
    if (req.body.year && req.body.month) {
      //revenue by days of specific year and month
      const currentYear = req.body.year;
      const currentMonth = req.body.month;

      Payment.aggregate()
        .facet({
          revenue: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $year: "$orderPlacedDate" }, req.body.year] },
                    { $eq: [{ $month: "$orderPlacedDate" }, req.body.month] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: {
                  year: { $year: "$orderPlacedDate" },
                  month: { $month: "$orderPlacedDate" },
                  day: { $dayOfMonth: "$orderPlacedDate" },
                },
                total: { $sum: "$total" },
              },
            },
            {
              $project: {
                _id: {
                  date: {
                    $concat: [
                      { $substr: [{ $toString: "$_id.year" }, 0, -1] },
                      "-",
                      { $substr: [{ $toString: "$_id.month" }, 0, -1] },
                      "-",
                      { $substr: [{ $toString: "$_id.day" }, 0, -1] },
                    ],
                  },
                },
                total: 1,
              },
            },
          ],
        })
        .exec((err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            Stock.aggregate()
              .facet({
                expenses: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: [{ $year: "$updatedDate" }, req.body.year] },
                          {
                            $eq: [{ $month: "$updatedDate" }, req.body.month],
                          },
                          { $eq: ["$status", "Purchased"] },
                        ],
                      },
                    },
                  },
                  {
                    $group: {
                      _id: {
                        year: { $year: "$updatedDate" },
                        month: { $month: "$updatedDate" },
                        day: { $dayOfMonth: "$updatedDate" },
                      },
                      total: { $sum: "$expenditure" },
                    },
                  },
                  {
                    $project: {
                      _id: {
                        date: {
                          $concat: [
                            { $substr: [{ $toString: "$_id.year" }, 0, -1] },
                            "-",
                            { $substr: [{ $toString: "$_id.month" }, 0, -1] },
                            "-",
                            { $substr: [{ $toString: "$_id.day" }, 0, -1] },
                          ],
                        },
                      },
                      total: 1,
                    },
                  },
                ],
              })
              .exec((err, result2) => {
                if (err) {
                  console.log(err);

                  res.status(400).send(err);
                } else {
                  result[0].revenue.forEach(function (doc) {
                    doc.month = monthNames[parseInt(doc.month, 10)];
                  });
                  result2[0].expenses.forEach(function (doc) {
                    doc.month = monthNames[parseInt(doc.month, 10)];
                  });
                  res.status(200).json({
                    revenue: result[0].revenue,
                    expenses: result2[0].expenses,
                  });
                }
              });
          }
        });

      // Payment.aggregate()
      //   .match({
      //     $expr: {
      //       $and: [
      //         { $eq: [{ $year: "$orderPlacedDate" }, req.body.year] },
      //         { $eq: [{ $month: "$orderPlacedDate" }, req.body.month] },
      //       ],
      //     },
      //   })
      //   .group({
      //     _id: {
      //       year: { $year: "$orderPlacedDate" },
      //       month: { $month: "$orderPlacedDate" },
      //       day: { $dayOfMonth: "$orderPlacedDate" },
      //     },
      //     total: { $sum: "$total" },
      //   })
      //   .project({
      //     _id: {
      //       date: {
      //         $concat: [
      //           { $substr: [{ $toString: "$_id.year" }, 0, -1] },
      //           "-",
      //           { $substr: [{ $toString: "$_id.month" }, 0, -1] },
      //           "-",
      //           { $substr: [{ $toString: "$_id.day" }, 0, -1] },
      //         ],
      //       },
      //     },
      //     total: 1,
      //   })
      //   .exec((err, result) => {
      //     if (err) {
      //       res.status(400).send(err);
      //       console.log(err);
      //     } else {
      //       res.status(200).json({
      //         message: "success",
      //         revenue: result,
      //       });
      //     }
      //     console.log(result);
      //   });
    } else {
      //THIS YEAR revenue;
      // const currentYear = new Date().getFullYear();

      Payment.aggregate()
        .facet({
          revenue: [
            {
              $match: {
                $expr: {
                  $eq: [{ $year: "$orderPlacedDate" }, req.body.year],
                },
              },
            },
            {
              $group: {
                _id: { month: { $substr: ["$orderPlacedDate", 5, 2] } },
                total: { $sum: "$total" },
              },
            },
            {
              $project: {
                month: "$_id.month",
                total: "$total",
                _id: 0,
              },
            },
          ],
        })
        .exec((err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            Stock.aggregate()
              .facet({
                expenses: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: [{ $year: "$updatedDate" }, req.body.year] },
                          { $eq: ["$status", "Purchased"] },
                        ],
                      },
                    },
                  },
                  {
                    $group: {
                      _id: { month: { $substr: ["$updatedDate", 5, 2] } },
                      total: { $sum: "$expenditure" },
                    },
                  },
                  {
                    $project: {
                      month: "$_id.month",
                      total: "$total",
                      _id: 0,
                    },
                  },
                ],
              })
              .exec((err, result2) => {
                if (err) {
                  console.log(err);

                  res.status(400).send(err);
                } else {
                  result[0].revenue.forEach(function (doc) {
                    doc.month = monthNames[parseInt(doc.month, 10)];
                  });
                  result2[0].expenses.forEach(function (doc) {
                    doc.month = monthNames[parseInt(doc.month, 10)];
                  });
                  res.status(200).json({
                    revenue: result[0].revenue,
                    expenses: result2[0].expenses,
                  });
                }
              });
          }
        });
    }
  }

  if (req.body.chart === "sales") {
    // const startDate = new Date("1/1/2022");
    // const endDate = new Date("1/20/2023");
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (req.body.chartType === "lineChart") {
      // GET COUNT based on month

      // Orders.aggregate()
      //   .match({
      //     orderPlacedDate: { $gte: startDate, $lte: endDate },
      //   })
      //   .unwind("products")
      //   .lookup({
      //     from: "products",
      //     localField: "products.product",
      //     foreignField: "_id",
      //     as: "product_docs",
      //   })
      //   .unwind("product_docs")
      //   .group({
      //     _id: {
      //       date: {
      //         $dateToString: { format: "%Y-%m-%d", date: "$orderPlacedDate" },
      //       },
      //       category: "$product_docs.category",
      //     },
      //     count: { $sum: "$products.quantity" },
      //   })
      //   .group({
      //     _id: { category: "$_id.category" },
      //     sales: { $push: { date: "$_id.date", count: "$count" } },
      //   })
      //   .exec(function (err, result) {
      //     if (err) {
      //       res.status(400).send(err);
      //       console.log(err);
      //     } else {
      //       res.status(200).json({
      //         message: "success",
      //         result: result,
      //       });
      //     }
      //   });

      Orders.aggregate()
        .match({
          orderPlacedDate: { $gte: startDate, $lte: endDate },
        })
        .unwind("products")
        .lookup({
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "product_docs",
        })
        .unwind("product_docs")
        .group({
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$orderPlacedDate" },
            },
            category: "$product_docs.category",
          },
          count: { $sum: "$products.quantity" },
        })
        .group({
          _id: { category: "$_id.category" },
          sales: { $push: { date: "$_id.date", count: "$count" } },
        })
        .exec(function (err, result) {
          if (err) {
            res.status(400).send(err);
            console.log(err);
          } else {
            result.forEach(function (doc) {
              doc.sales.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
              });
            });
            res.status(200).json({
              message: "success",
              result: result,
            });
          }
        });
    } else {
      Orders.aggregate([
        {
          $match: {
            orderPlacedDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "product_docs",
          },
        },
        {
          $unwind: "$product_docs",
        },
        {
          $group: {
            _id: {
              category: "$product_docs.category",
              type: "$product_docs.type",
              flavor: "$product_docs.flavor",
            },
            count: { $sum: "$products.quantity" },
          },
        },
        {
          $group: {
            _id: {
              category: "$_id.category",
              type: "$_id.type",
            },
            flavors: {
              $push: { flavor: "$_id.flavor", count: "$count" },
            },
            count: { $sum: "$count" },
          },
        },
        {
          $group: {
            _id: "$_id.category",
            types: {
              $push: {
                type: "$_id.type",
                count: "$count",
                flavors: "$flavors",
              },
            },
          },
        },
      ]).exec(function (err, result) {
        if (err) {
          res.status(400).send(err);
          console.log(err);
        } else {
          res.status(200).json({
            message: "success",
            result: result,
          });
        }
      });
    }
  }

  if (req.body.chart === "inventory") {
    // Create an object to store the total quantities for each inventory

    // const quantities = {};

    // // Find all the stock items
    // Stock.find({}, (err, stocks) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // Find all the inventories
    //     Inventory.find({}, (err, inventories) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         stocks.forEach((stock) => {
    //           if (!quantities[stock.inventoryType]) {
    //             quantities[stock.inventoryType] = 0;
    //           }
    //           if (stock.status === "Purchased") {
    //             quantities[stock.inventoryType] += stock.borrowedQuantity;
    //           } else {
    //             quantities[stock.inventoryType] -= stock.borrowedQuantity;
    //           }
    //         });
    //         // Rename the keys of the quantities object
    //         for (let inventoryType in quantities) {
    //           const inventory = inventories.find((i) => i._id == inventoryType);
    //           quantities[inventory.name] = quantities[inventoryType];
    //           delete quantities[inventoryType];
    //         }
    //         for (let inventoryName in quantities) {
    //           const inventory = inventories.find(
    //             (i) => i.name == inventoryName
    //           );
    //           if (quantities[inventoryName] < inventory.reorderQuantity) {
    //             // Trigger reorder
    //           }
    //         }
    //         res.status(200).json({
    //           message: "success",
    //           result: quantities,
    //         });
    //       }
    //     });
    //   }
    // });
    const quantities = {};

    // Find all the stock items
    Stock.find({}, (err, stocks) => {
      if (err) {
        console.log(err);
      } else {
        // Find all the inventories
        Inventory.find({}, (err, inventories) => {
          if (err) {
            console.log(err);
          } else {
            stocks.forEach((stock) => {
              if (!quantities[stock.inventoryType]) {
                quantities[stock.inventoryType] = 0;
              }
              if (stock.status === "Purchased") {
                quantities[stock.inventoryType] += stock.borrowedQuantity;
              } else {
                quantities[stock.inventoryType] -= stock.borrowedQuantity;
              }
            });
            // Rename the keys of the quantities object
            const resultArray = [];
            for (let inventoryType in quantities) {
              const inventory = inventories.find((i) => i._id == inventoryType);
              resultArray.push({
                name: inventory.name,
                quantity: quantities[inventoryType],
              });
            }
            for (let inventory of resultArray) {
              const inventoryInDb = inventories.find(
                (i) => i.name == inventory.name
              );
              if (inventory.quantity < inventoryInDb.reorderQuantity) {
                // Trigger reorder
              }
            }
            res.status(200).json({
              message: "success",
              result: resultArray,
              inventory: inventories,
            });
          }
        });
      }
    });
  }

  //DATE RANGE revenue
  // Payment.aggregate()
  //   .match({
  //     orderPlacedDate: { $gte: startDate, $lte: endDate },
  //   })
  //   .group({
  //     _id: { month: { $substr: ["$orderPlacedDate", 5, 2] } },
  //     total: { $sum: "$total" },
  //   })
  //   .exec(function (err, result) {
  //     if (err) {
  //       res.status(400).send(err);
  //       console.log(err);
  //     } else {
  //       result.forEach(function (doc) {
  //         doc._id.month = monthNames[parseInt(doc._id.month, 10)];
  //       });
  //       res.status(200).json({
  //         message: "success",
  //         result: result,
  //       });
  //     }
  //     // result is an array of documents, each containing the month name and the count for that month
  //   });

  //year and month based revenue by days
};
