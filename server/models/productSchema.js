import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  flavor: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  optionalImage1: {
    type: String,
    required: true,
  },
  optionalImage2: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
  },
});

export default mongoose.model("Products", productSchema);
