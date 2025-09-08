import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import {
    approveApplication,
    createApplication,
    deleteApplication, getAllApplications, getApplicationsByTenant, getApplicationsByTradePoint,
    rejectApplication
} from "../controllers/application.js";
import {catchAsyncHandler} from "../utils/catchAsyncHandler.js";

const router = express.Router();

router.post("/", authenticate, authorize("tenant"), catchAsyncHandler(createApplication));

router.post("/:id/approve", authenticate, authorize("manager"), catchAsyncHandler(approveApplication));

router.post("/:id/reject", authenticate, authorize("manager"), catchAsyncHandler(rejectApplication));

router.delete("/:id", authenticate, authorize("tenant", "manager"), catchAsyncHandler(deleteApplication));

router.get("/", authenticate, authorize("manager"), catchAsyncHandler(getAllApplications));

router.get("/tenant/:id", authenticate, authorize("tenant", "manager"), catchAsyncHandler(getApplicationsByTenant));

router.get("/trade-point/:id", authenticate, authorize("manager"), catchAsyncHandler(getApplicationsByTradePoint));


export default router;