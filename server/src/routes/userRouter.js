import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "../controller/userController.js";
import verifyToken from "../middleware/authMiddleWare.js";

const router = express.Router();

// Get logged-in user's profile
router.get("/profile", verifyToken, getUserProfile);

// Update user profile
router.put("/profile", verifyToken, updateUserProfile);

// Change password
router.post("/change-password", verifyToken, changeUserPassword);

export default router;
