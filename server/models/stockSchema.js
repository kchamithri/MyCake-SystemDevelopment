import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  inventoryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
  updatedDate: {
    type: Date,
    required: true,
  },
  supplierName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: false,
  },
  borrowedQuantity: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  expenditure: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Stock", stockSchema);
