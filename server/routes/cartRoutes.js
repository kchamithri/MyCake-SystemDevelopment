import express from "express";
import {
  AddToCart,
  DeleteCart,
  ViewCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", AddToCart);
router.post("/get", ViewCart);
router.post("/delete", DeleteCart);

export default router;
