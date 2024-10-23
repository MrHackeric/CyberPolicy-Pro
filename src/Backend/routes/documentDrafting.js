const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const { generateDocument } = require("../services/documentAiService");

// Generate new document
router.post("/generate", async (req, res) => {
  try {
    const {
      type,
      companyName,
      industry,
      location,
      duration,
      dataCollection,
      customFields,
    } = req.body;

    // Validate required fields
    if (!type || !companyName || !industry) {
      return res.status(400).json({
        message:
          "Missing required fields: type, companyName, and industry are required",
      });
    }

    // Generate document content using AI
    const content = await generateDocument(type, {
      companyName,
      industry,
      location,
      duration,
      dataCollection,
    });

    // Save document to database
    const document = new Document({
      type,
      companyName,
      industry,
      content,
      metadata: {
        version: "1.0",
        customFields: customFields || {},
      },
    });

    const savedDocument = await document.save();

    res.status(201).json({
      message: "Document generated successfully",
      document: savedDocument,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating document",
      error: error.message,
    });
  }
});

// Get document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving document",
      error: error.message,
    });
  }
});

// Update document
router.put("/:id", async (req, res) => {
  try {
    const { companyName, industry, customFields } = req.body;

    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      {
        companyName,
        industry,
        "metadata.customFields": customFields,
        "metadata.lastUpdated": Date.now(),
      },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({
      message: "Error updating document",
      error: error.message,
    });
  }
});

// Delete document
router.delete("/:id", async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);

    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting document",
      error: error.message,
    });
  }
});

module.exports = router;
