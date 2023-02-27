import express from "express";

import {
  OrderStatusUpadate,
  ViewOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/get", ViewOrders);
router.post("/statusUpdate", OrderStatusUpadate);

export default router;
