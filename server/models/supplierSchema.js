import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
  },
});

export default mongoose.model("Supplier", supplierSchema);
