import express from "express";
import {
  AddProduct,
  DeleteProduct,
  GetTypesAndFlavors,
  UpdateProduct,
  ViewProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/view", ViewProducts);
router.post("/add", AddProduct);
router.post("/update", UpdateProduct);
router.post("/delete", DeleteProduct);
router.post("/typesAndFlavours", GetTypesAndFlavors);

export default router;
