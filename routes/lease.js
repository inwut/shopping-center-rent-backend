import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { catchAsyncHandler } from "../utils/catchAsyncHandler.js";
import {
    deleteLease,
    getAllLeases,
    getLeasesByTenant,
    getLeasesByTradePoint,
    getMyLeases
} from "../controllers/lease.js";

const router = express.Router();

router.delete("/", authenticate, authorize("manager"), catchAsyncHandler(deleteLease));

router.get("/", authenticate, authorize("manager"), catchAsyncHandler(getAllLeases));

router.get("/tenant/:id", authenticate, authorize("manager"), catchAsyncHandler(getLeasesByTenant));

router.get("/trade-point/:id", authenticate, authorize("manager"), catchAsyncHandler(getLeasesByTradePoint));

router.get("/my", authenticate, authorize("tenant"), catchAsyncHandler(getMyLeases));

export default router;