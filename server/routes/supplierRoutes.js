import express from "express";
import {
  AddSupplier,
  DeleteSupplier,
  GetSupplier,
  UpdateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.post("/add", AddSupplier);
router.post("/get", GetSupplier);
router.post("/delete", DeleteSupplier);
router.post("/update", UpdateSupplier);

export default router;
