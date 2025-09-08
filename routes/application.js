import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { catchAsyncHandler } from "../utils/catchAsyncHandler.js";
import {
    approveApplication,
    createApplication,
    deleteApplication,
    getAllApplications,
    getApplicationsByTenant,
    getApplicationsByTradePoint,
    getMyApplications,
    rejectApplication
} from "../controllers/application.js";
import { createApplicationValidator } from "../middlewares/validators/application.js";
import { idValidator } from "../middlewares/validators/idValidator.js";
import { validationErrorHandler } from "../middlewares/validationErrorHandler.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("tenant"),
    createApplicationValidator,
    validationErrorHandler,
    catchAsyncHandler(createApplication)
);

router.post(
    "/:id/approve",
    authenticate,
    authorize("manager"),
    idValidator,
    validationErrorHandler,
    catchAsyncHandler(approveApplication)
);

router.post(
    "/:id/reject",
    authenticate,
    authorize("manager"),
    idValidator,
    validationErrorHandler,
    catchAsyncHandler(rejectApplication)
);

router.delete(
    "/:id",
    authenticate,
    authorize("tenant", "manager"),
    idValidator,
    validationErrorHandler,
    catchAsyncHandler(deleteApplication)
);

router.get(
    "/",
    authenticate,
    authorize("manager"),
    catchAsyncHandler(getAllApplications)
);

router.get(
    "/tenant/:id",
    authenticate,
    authorize("manager"),
    idValidator,
    validationErrorHandler,
    catchAsyncHandler(getApplicationsByTenant)
);

router.get(
    "/trade-point/:id",
    authenticate,
    authorize("manager"),
    idValidator,
    validationErrorHandler,
    catchAsyncHandler(getApplicationsByTradePoint)
);

router.get(
    "/my",
    authenticate,
    authorize("tenant"),
    catchAsyncHandler(getMyApplications)
);

export default router;