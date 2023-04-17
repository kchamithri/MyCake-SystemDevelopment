import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  deliverDate: {
    type: String,
    required: true,
  },
  deliverTime: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderContact: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  orderPlacedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Orders", orderSchema);
