import mongoose from "mongoose";

const newBorrowedInventorySchema = new mongoose.Schema({
  inventoryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
  updatedDate: {
    type: String,
    required: true,
  },
  supplierName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: false,
  },
  borrowedQuantity: {
    type: String,
    required: true,
  },
  expenditure: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.model(
  "NewBorrowedInventory",
  newBorrowedInventorySchema
);
