import express from "express";
import { login, logout, signup } from "../controllers/auth.js";
import { catchAsyncHandler } from "../utils/catchAsyncHandler.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", catchAsyncHandler(signup));
router.post("/login", catchAsyncHandler(login));
router.post("/logout", auth, logout);

export default router;