import express from "express";
import { auth, authorize } from "../middlewares/auth.js";
import {
    createTradePoint,
    getAllTradePoints,
    updateTradePoint,
    deleteTradePoint
} from "../controllers/tradePoint.js";
import {catchAsyncHandler} from "../utils/catchAsyncHandler.js";

const router = express.Router();

router.post("/", auth, authorize("manager"), catchAsyncHandler(createTradePoint));

router.put("/:id", auth, authorize("manager"), catchAsyncHandler(updateTradePoint));

router.delete("/:id", auth, authorize("manager"), catchAsyncHandler(deleteTradePoint));

router.get("/", auth, authorize("manager", "tenant"), catchAsyncHandler(getAllTradePoints));

export default router;