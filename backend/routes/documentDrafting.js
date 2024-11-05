import express from "express";
const router = express.Router();
import { Document } from "../models/Document.js";
import { generateDocumentController } from "../controllers/documentDrafting.js";
import mongoose from "mongoose";

// Generate new document
router.post("/generate", generateDocumentController);

// Get document by ID`
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid document ID format.",
    });
  }

  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({
        error: true,
        message: "Document not found",
      });
    }

    res.status(200).json({
      error: false,
      data: document,
      message: "Document retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error retrieving document",
      details: error.message,
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

export default router;
