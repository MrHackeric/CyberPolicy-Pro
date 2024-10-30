const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");
const { generateComplianceAlert } = require("../services/alertAiService");

// Create new alert
router.post("/create", async (req, res) => {
  try {
    const { companyId, industry, changeType, context } = req.body;

    // Generate alert content using AI
    const aiGeneratedAlert = await generateComplianceAlert({
      industry,
      changeType,
      context,
    });

    // Create new alert
    const alert = new Alert({
      companyId,
      industry,
      type: changeType,
      ...aiGeneratedAlert,
    });

    const savedAlert = await alert.save();

    res.status(201).json({
      message: "Alert created successfully",
      alert: savedAlert,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating alert",
      error: error.message,
    });
  }
});

// Get all alerts for a company
router.get("/company/:companyId", async (req, res) => {
  try {
    const alerts = await Alert.find({
      companyId: req.params.companyId,
    }).sort({ createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving alerts",
      error: error.message,
    });
  }
});

// Get active alerts for a company (pending or in_progress)
router.get("/company/:companyId/active", async (req, res) => {
  try {
    const alerts = await Alert.find({
      companyId: req.params.companyId,
      status: { $in: ["pending", "in_progress"] },
    }).sort({ severity: -1, createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving active alerts",
      error: error.message,
    });
  }
});

// Update alert status
router.patch("/:alertId/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (
      !["pending", "in_progress", "completed", "dismissed"].includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.alertId,
      {
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    res.json(updatedAlert);
  } catch (error) {
    res.status(500).json({
      message: "Error updating alert status",
      error: error.message,
    });
  }
});

// Delete alert
router.delete("/:alertId", async (req, res) => {
  try {
    const deletedAlert = await Alert.findByIdAndDelete(req.params.alertId);

    if (!deletedAlert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    res.json({
      message: "Alert deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting alert",
      error: error.message,
    });
  }
});

module.exports = router;
