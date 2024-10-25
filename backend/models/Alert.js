const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["regulatory_change", "deadline", "risk_alert", "compliance_update"],
  },
  severity: {
    type: String,
    required: true,
    enum: ["low", "medium", "high", "critical"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionRequired: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "in_progress", "completed", "dismissed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Alert", alertSchema);
