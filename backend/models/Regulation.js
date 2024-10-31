import mongoose from "mongoose";

const regulationSchema = new mongoose.Schema({
  industry: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  businessSize: {
    type: String,
    required: true,
    enum: ["small", "medium", "large"],
  },
  guidelines: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Regulation = mongoose.model("Regulation", regulationSchema);
