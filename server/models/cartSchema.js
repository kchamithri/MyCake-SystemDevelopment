import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Cart", cartSchema);
