import express from "express";
import { GetNewInventories } from "../controllers/newBorrowedInventoryController.js";

const router = express.Router();

router.post("/get", GetNewInventories);

export default router;
