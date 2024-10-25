const mongoose = require("mongoose");

const complianceScoreSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  dataHandlingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  securityMeasuresScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  employeeTrainingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  riskFactors: [
    {
      category: String,
      description: String,
      severity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
      },
    },
  ],
  recommendations: [
    {
      priority: Number,
      description: String,
      impact: String,
    },
  ],
  assessmentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ComplianceScore", complianceScoreSchema);
