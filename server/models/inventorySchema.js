import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reorderQuantity: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Inventory", inventorySchema);
