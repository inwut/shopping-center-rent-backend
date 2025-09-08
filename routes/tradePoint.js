import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import {
    createTradePoint,
    getAllTradePoints,
    updateTradePoint,
    deleteTradePoint
} from "../controllers/tradePoint.js";
import { catchAsyncHandler } from "../utils/catchAsyncHandler.js";
import { validationErrorHandler } from "../middlewares/validationErrorHandler.js";
import { idValidator } from "../middlewares/validators/idValidator.js";
import {
    createTradePointValidator,
    getAllTradePointsValidator,
    updateTradePointValidator
} from "../middlewares/validators/tradePoint.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("manager"),
    createTradePointValidator,
    validationErrorHandler,
    catchAsyncHandler(createTradePoint)
);

router.put(
    "/:id",
    authenticate,
    authorize("manager"),
    idValidator,
    updateTradePointValidator,
    validationErrorHandler,
    catchAsyncHandler(updateTradePoint)
);

router.delete(
    "/:id",
    authenticate,
    authorize("manager"),
    idValidator,
    validationErrorHandler,
    catchAsyncHandler(deleteTradePoint)
);

router.get(
    "/",
    authenticate,
    authorize("manager", "tenant"),
    getAllTradePointsValidator,
    validationErrorHandler,
    catchAsyncHandler(getAllTradePoints)
);

export default router;