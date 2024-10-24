const inviteSchema = new Schema(
  {
    inviteId: { type: String, required: true, unique: true },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
      required: true,
    }, // Reference to the related Business
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user", "superuser"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      required: true,
    },
  },
  { timestamps: true }
);

export const InviteModel = mongoose.model("invites", inviteSchema);

//   invite accessors
// Get an invite by its ID
export const getInviteById = (id) => InviteModel.findById(id);

// Get invites for a specific business
export const getInvitesByBusinessId = (businessId) =>
  InviteModel.find({ businessId });

// Get all invites by email
export const getInvitesByEmail = (email) => InviteModel.find({ email });

// Create a new invite
export const createInvite = (values) =>
  new InviteModel(values).save().then((invite) => invite.toObject());

// Update an invite's status (e.g., pending, accepted, declined)
export const updateInviteStatus = (id, status) =>
  InviteModel.findOneAndUpdate({ _id: id }, { status }, { new: true });

// Delete an invite by its ID
export const deleteInviteById = (id) =>
  InviteModel.findOneAndDelete({ _id: id });
