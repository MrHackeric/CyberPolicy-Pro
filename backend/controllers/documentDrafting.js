import { Document } from "../models/Document.js";
import { generateDocument } from "../services/documentAiService.js";

export const generateDocumentController = async (req, res) => {
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

    // // Validate required fields
    // if (!type || !companyName || !industry) {
    //   return res.status(400).json({
    //     message:
    //       "Missing required fields: type, companyName, and industry are required",
    //   });
    // }

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
};
