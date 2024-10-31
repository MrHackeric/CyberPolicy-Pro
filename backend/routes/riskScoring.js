// src/routes/riskScoring.js - Update the parsing logic
import express from "express";
const router = express.Router();
import {ComplianceScore} from "../models/ComplianceScore.js";
import {
  analyzeRiskFactors,
  calculateScores,
} from "../services/riskScoringAiService.js";

// Calculate and store risk score
router.post("/calculate", async (req, res) => {
  try {
    const {
      companyId,
      industry,
      dataHandling,
      securityMeasures,
      employeeTraining,
    } = req.body;

    // Calculate scores
    const scores = calculateScores({
      dataHandling,
      securityMeasures,
      employeeTraining,
    });

    // Get AI analysis
    const aiAnalysis = await analyzeRiskFactors({
      industry,
      dataHandling,
      securityMeasures,
      employeeTraining,
    });

    // More robust parsing of AI analysis
    let riskFactors = [];
    let recommendations = [];

    try {
      // Safely parse risk factors
      const riskLines = aiAnalysis
        .split("\n")
        .filter(
          (line) =>
            line.toLowerCase().includes("risk") ||
            line.toLowerCase().includes("vulnerability") ||
            line.toLowerCase().includes("threat")
        );

      riskFactors = riskLines.map((line) => {
        let severity = "medium"; // default severity
        if (line.toLowerCase().includes("critical")) severity = "critical";
        else if (line.toLowerCase().includes("high")) severity = "high";
        else if (line.toLowerCase().includes("low")) severity = "low";

        return {
          category: "Security Risk",
          description: line.trim(),
          severity,
        };
      });

      // Safely parse recommendations
      const recommendationLines = aiAnalysis
        .split("\n")
        .filter(
          (line) =>
            line.toLowerCase().includes("recommend") ||
            line.toLowerCase().includes("suggest") ||
            line.toLowerCase().includes("should") ||
            line.toLowerCase().includes("improve")
        );

      recommendations = recommendationLines.map((line, index) => ({
        priority: index + 1,
        description: line.trim(),
        impact: "Improves overall compliance score",
      }));
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      // Fallback to basic risk assessment if parsing fails
      riskFactors = [
        {
          category: "General Risk",
          description: "Automated risk assessment completed",
          severity: scores.overallScore < 50 ? "high" : "medium",
        },
      ];
      recommendations = [
        {
          priority: 1,
          description: "Review compliance measures based on score breakdown",
          impact: "Improves overall compliance score",
        },
      ];
    }

    // Create new compliance score record
    const complianceScore = new ComplianceScore({
      companyId,
      industry,
      ...scores,
      riskFactors,
      recommendations,
    });

    const savedScore = await complianceScore.save();

    res.status(201).json({
      message: "Risk assessment completed",
      assessment: savedScore,
    });
  } catch (error) {
    console.error("Full error details:", error);
    res.status(500).json({
      message: "Error calculating risk score",
      error: error.message,
      details: "An error occurred during risk calculation. Please try again.",
    });
  }
});

// Get risk assessment history
router.get("/history/:companyId", async (req, res) => {
  try {
    const assessments = await ComplianceScore.find({
      companyId: req.params.companyId,
    }).sort({ assessmentDate: -1 });

    res.json(assessments);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving assessment history",
      error: error.message,
    });
  }
});

// Get latest risk assessment
router.get("/latest/:companyId", async (req, res) => {
  try {
    const latestAssessment = await ComplianceScore.findOne({
      companyId: req.params.companyId,
    }).sort({ assessmentDate: -1 });

    if (!latestAssessment) {
      return res.status(404).json({
        message: "No risk assessment found for this company",
      });
    }

    res.json(latestAssessment);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving latest assessment",
      error: error.message,
    });
  }
});

function determineSeverity(riskLine) {
  const line = riskLine.toLowerCase();
  if (line.includes("critical")) return "critical";
  if (line.includes("high")) return "high";
  if (line.includes("medium")) return "medium";
  return "low";
}

export default router
