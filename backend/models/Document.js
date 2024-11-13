import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "nda",
      "privacy_policy",
      "employment_contract",
      "company_policy",
    ],
  },
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  metadata: {
    version: {
      type: String,
      default: "1.0",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    customFields: {
      type: Map,
      of: String,
    },
  },
});

export const Document = mongoose.model("Document", documentSchema);
