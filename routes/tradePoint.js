import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import {
    createTradePoint,
    getAllTradePoints,
    updateTradePoint,
    deleteTradePoint
} from "../controllers/tradePoint.js";
import {catchAsyncHandler} from "../utils/catchAsyncHandler.js";

const router = express.Router();

router.post("/", authenticate, authorize("manager"), catchAsyncHandler(createTradePoint));

router.put("/:id", authenticate, authorize("manager"), catchAsyncHandler(updateTradePoint));

router.delete("/:id", authenticate, authorize("manager"), catchAsyncHandler(deleteTradePoint));

router.get("/", authenticate, authorize("manager", "tenant"), catchAsyncHandler(getAllTradePoints));

export default router;