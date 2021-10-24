import mongoose from "mongoose";

let roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalReports: {
    type: Number,
    required: true,
  },
  quantSubdivision: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Room", roomSchema);
