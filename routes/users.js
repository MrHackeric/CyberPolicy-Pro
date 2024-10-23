import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controllers/users.js";
import { isAuthenticated, isOwner } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getall", isAuthenticated, getAllUsers);

router.delete("/deleteuser/:id", isAuthenticated, isOwner, deleteUser);

router.post("/update/:id", isAuthenticated, isOwner, updateUser);

export default router;