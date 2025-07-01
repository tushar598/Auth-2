import { Router } from "express";
import { createUser, loginUser, logoutUser, deleteUser } from "../controller/authController.js";

const router = Router();

router.post("/register" , createUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.post("/delete/:id" , deleteUser);
export default router;