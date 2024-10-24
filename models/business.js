import mongoose from "mongoose";
const { Schema } = mongoose;

const businessSchema = new Schema(
  {
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    industry: { type: String, required: true },
    businessemail: { type: String, required: true, unique: true },
    businessaddress: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }, // Reference to User who created the business
    createdDate: { type: Date, default: Date.now },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // Reference to multiple users who collaborate on the business
    businessDescription: { type: String },
  },
  { timestamps: true }
);

export const BusinessModel = mongoose.model("businesses", businessSchema);

// business accessors
import { BusinessModel } from "./models/Business";

// Get a business by its ID
export const getBusinessById = (id) => BusinessModel.findById(id);

// Get a business by its name
export const getBusinessByName = (name) =>
  BusinessModel.findOne({ businessName: name });

// Get all businesses
export const getAllBusinesses = () => BusinessModel.find();

// Create a new business
export const createBusiness = (values) =>
  new BusinessModel(values).save().then((business) => business.toObject());

// Update an existing business by its ID
export const updateBusiness = (id, values) =>
  BusinessModel.findOneAndUpdate({ _id: id }, values, { new: true });

// Delete a business by its ID
export const deleteBusinessById = (id) =>
  BusinessModel.findOneAndDelete({ _id: id });

// Get all businesses created by a specific user
export const getBusinessesByUserId = (userId) =>
  BusinessModel.find({ createdBy: userId });

// Add a collaborator to a business
export const addCollaboratorToBusiness = (businessId, userId) =>
  BusinessModel.findByIdAndUpdate(businessId, {
    $push: { collaborators: userId },
  });
