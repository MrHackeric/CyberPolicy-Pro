const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "nda",
      "privacy_policy",
      "terms_of_service",
      "data_processing_agreement",
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

module.exports = mongoose.model("Document", documentSchema);
