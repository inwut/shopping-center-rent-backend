import express from "express";
import { login, logout, signup } from "../controllers/auth.js";
import { catchAsyncHandler } from "../utils/catchAsyncHandler.js";
import { authenticate } from "../middlewares/auth.js";
import { loginValidator, signupValidator } from "../middlewares/validators/auth.js";
import { validationErrorHandler } from "../middlewares/validationErrorHandler.js";

const router = express.Router();

router.post(
    "/signup",
    signupValidator,
    validationErrorHandler,
    catchAsyncHandler(signup)
);

router.post(
    "/login",
    loginValidator,
    validationErrorHandler,
    catchAsyncHandler(login)
);

router.post(
    "/logout",
    authenticate,
    logout
);

export default router;