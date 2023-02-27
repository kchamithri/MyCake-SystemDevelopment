// import all dependencies
import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import md5 from "crypto-js/md5.js";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import newBorrowedInventoryRoutes from "./routes/newBorrowedInventoryRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import Payment from "./models/paymentSchema.js";

const app = express();

//configure env file & require connection file
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/products", productRoutes);
app.use("/admin/cart", cartRoutes);
app.use("/admin/orders", orderRoutes);
app.use("/admin/supplier", supplierRoutes);
app.use("/admin/inventory/type", inventoryRoutes);
app.use("/admin/inventory/stock", stockRoutes);
app.use("/admin/inventory/newBorrowedInventory", newBorrowedInventoryRoutes);
app.use("/admin/reports", reportRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is listening on port 3001");
});

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

//payment gateway
app.post("/notify", async function (req, res, next) {
  try {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      method,
      status_message,
    } = req.body;

    const merchant_secret =
      "MTQzODMyMTI0NTM1NzA3MTEwMjQ0MjMxMTg0OTIxNDI3OTM5ODU4";

    const md5Signature = md5(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        md5(merchant_secret).toString().toUpperCase()
    )
      .toString()
      .toUpperCase();

    if (md5Signature === md5sig && status_code == 2) {
      // console.log(
      //   merchant_id,
      //   order_id,
      //   payment_id,
      //   payhere_amount,
      //   payhere_currency,
      //   status_code,
      //   md5sig,
      //   method,
      //   status_message
      // );

      // Save the payment information to the DB
      const payment = await Payment.updateOne(
        { _id: order_id, paymentstatus: "pending" },
        { $set: { paymentstatus: "success" } }
      );
      res.status(200).send("Payment Success");
    } else {
      res.status(400).send("Payment Failed");
    }
  } catch (error) {
    res.status(400).send("Payment Failed");
    next();
  }
});
app.post("/confirmPayment", async (req, res) => {
  try {
    const paymentId = req.body.paymentId;
    const payment = await Payment.findOne({ _id: paymentId });
    if (payment.paymentstatus === "success") {
      res.status(200).json({
        message: "Successfully Paid",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
