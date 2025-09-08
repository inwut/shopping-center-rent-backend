import express from "express";
import { login, logout, signup } from "../controllers/auth.js";
import { catchAsyncHandler } from "../utils/catchAsyncHandler.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", catchAsyncHandler(signup));
router.post("/login", catchAsyncHandler(login));
router.post("/logout", authenticate, logout);

export default router;