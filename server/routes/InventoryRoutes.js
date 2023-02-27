import express from "express";
import {
  AddInventory,
  DeleteInventory,
  GetInventory,
  UpdateInventory,
} from "../controllers/InventoryController.js";

const router = express.Router();

router.post("/add", AddInventory);
router.post("/get", GetInventory);
router.post("/delete", DeleteInventory);
router.post("/update", UpdateInventory);

export default router;
