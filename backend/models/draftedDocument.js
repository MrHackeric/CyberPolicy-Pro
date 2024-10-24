import mongoose from "mongoose";

const draftedDocumentSchema = new mongoose.Schema({
  templateType: { type: String, required: true },
});
