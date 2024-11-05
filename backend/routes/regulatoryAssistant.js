import express from "express";
const router = express.Router();
import { Regulation } from "../models/Regulation.js";
import { generateComplianceGuidance } from "../services/aiService.js";

// Get combined guidance (stored + AI)
router.get("/guidance", async (req, res) => {
  try {
    const { industry, location, businessSize } = req.query;

    if (!industry || !location || !businessSize) {
      return res.status(400).json({
        message: "Missing required parameters",
      });
    }

    // Get stored regulation data
    const regulation = await Regulation.findOne({
      industry,
      location,
      businessSize,
    });

    // Get AI-generated guidance
    const aiGuidance = await generateComplianceGuidance(
      industry,
      location,
      businessSize
    );

    // Combine stored and AI-generated guidance
    const response = {
      storedGuidance: regulation ? regulation.guidelines : null,
      aiRecommendations: aiGuidance,
      metadata: {
        industry,
        location,
        businessSize,
        generatedAt: new Date(),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving guidance",
      error: error.message,
    });
  }
});

// Get AI-only guidance
router.get("/ai-guidance", async (req, res) => {
  try {
    const { industry, location, businessSize } = req.query;

    if (!industry || !location || !businessSize) {
      return res.status(400).json({
        message: "Missing required parameters",
      });
    }

    const aiGuidance = await generateComplianceGuidance(
      industry,
      location,
      businessSize
    );

    res.json({
      guidance: aiGuidance,
      metadata: {
        industry,
        location,
        businessSize,
        generatedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating AI guidance",
      error: error.message,
    });
  }
});

export default router;
