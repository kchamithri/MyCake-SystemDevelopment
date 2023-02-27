import express from "express";
import {
  AddStock,
  DeleteStock,
  GetStocks,
  TimelyAddStock,
} from "../controllers/stockController.js";

const router = express.Router();

router.post("/add", AddStock);
router.post("/get", GetStocks);
router.post("/delete", DeleteStock);
router.post("/addStocks", TimelyAddStock);

export default router;
