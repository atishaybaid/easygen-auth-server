import express from "express";
import { signup, login, testController } from "./authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

//test route
router.get("/test", testController);

export default router;
