import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  profilePicture: { type: String }, // URL to the profile picture
  role: { type: String, enum: ['admin', 'user', 'superuser'], required: true }, // Role with options
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
}, { timestamps: true });

export const UserModel = mongoose.model("users", userSchema);

// User accessors

export const getUserByEmail = (email) => UserModel.findOne({ email });

export const getUserById = (id) => UserModel.findById(id);

export const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const createUser = (values) =>
  new UserModel(values).save().then((user) => user.toObject());

export const getUsers = () => UserModel.find();

export const updateUser = (id, values) =>
  UserModel.findOneAndUpdate({ _id: id }, values, { new: true });

export const getUser = () => UserModel.findOne();

export const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id });
