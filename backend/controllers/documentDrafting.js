import { Document } from "../models/Document.js";
import { generateDocument } from "../services/documentAiService.js";
import { handleError } from "../utils/errorHandler.js";

export const generateDocumentController = async (req, res) => {
  //log the incoming body
  console.log("Received data:", req.body);
  // Received data: {
  //   type: 'nda',
  //   disclosingParty: 'MAster CHief',
  //   receivingParty: 'Finesy ENt',
  //   agreementDuration: '5'
  // }

  //restructure the body
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
    let content;
    try {
      content = await generateDocument(type, {
        companyName,
        industry,
        location,
        duration,
        dataCollection,
      });
      //log generated content
      console.log("Generated content:", content);
    } catch (error) {
      return handleError(
        res,
        500,
        "Failed to generate document content",
        error
      );
    }

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

    //Attempt to save document to the database
    let savedDocument;
    try {
      savedDocument = await document.save();
      console.log("Saved document:", savedDocument); // Log saved document
    } catch (err) {
      return handleError(res, 500, "Failed to save document to database", err);
    }

    // Step 7: Respond with success and document data
    res.status(201).json({
      message: "Document generated successfully",
      document: savedDocument,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating document",
      error: error.message,
    });
    console.error("Error in generateDocumentController:", error);
  }
};
