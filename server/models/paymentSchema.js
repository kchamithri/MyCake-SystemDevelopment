import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  orderPlacedDate: {
    type: Date,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  paymentstatus: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Payment", paymentSchema);
