import { draftDocument } from "../utils/AIEndpoints.js";

export const createDocumentTemplate = async (req, res) => {
  try {
    const { templateType, customizations } = req.body;

    //documenting drafting
    const draftedDocument = draftDocument(templateType, customizations);

    //save drafted document in the database;
    res.json({ success: true, data: draftedDocument });
  } catch (error) {
    console.log(error);
  }
};
