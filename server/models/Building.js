import express from "express";
import mongoose from "mongoose";

let buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  rooms: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Building", buildingSchema);
