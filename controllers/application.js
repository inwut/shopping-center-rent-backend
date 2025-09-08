import Application from "../models/application.js";
import createError from "http-errors";
import Lease from "../models/lease.js";
import TradePoint from "../models/tradePoint.js";

export const createApplication = async (req, res) => {
    const { tradePoint, startDate, endDate } = req.body;
    const user = req.user;

    const application = new Application({
        tenant: user._id,
        tradePoint,
        startDate,
        endDate
    });

    await application.save();

    res.status(200).json({
        message: "Successfully created application",
        application
    });
}

export const deleteApplication = async (req, res, next) => {
    const { id } = req.params;

    const deleted = await Application.findByIdAndDelete(id);

    if (!deleted) {
        return next(createError(404, "Application not found"));
    }

    res.status(200).json({
        message: "Successfully deleted application"
    });
};

export const approveApplication = async (req, res, next) => {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
        return next(createError(404, "Application not found"));
    }

    if (application.status === "approved") {
        return next(createError(400, "Application already approved"));
    }

    const tradePoint = await TradePoint.findById(application.tradePoint);

    if (!tradePoint) {
        return next(createError(404, "Trade point not found"));
    }

    const diffTime = application.endDate - application.startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalPayment = diffDays * tradePoint.dailyPrice;

    const lease = new Lease({
        tradePoint: application.tradePoint,
        tenant: application.tenant,
        startDate: application.startDate,
        endDate: application.endDate,
        totalPayment
    });

    await lease.save();

    application.status = "approved";
    await application.save();

    res.status(200).json({ message: "Application approved", lease });
};

export const rejectApplication = async (req, res, next) => {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
        return next(createError(404, "Application not found"));
    }

    application.status = "rejected";
    await application.save();

    res.json({ message: "Application rejected" });
};

export const getAllApplications = async (req, res) => {
    const applications = await Application.find()
        .populate("tenant", "_id")
        .populate("tradePoint", "_id");

    res.status(200).json(applications);
};

export const getApplicationsByTenant = async (req, res) => {
    const { id } = req.params;

    const applications = await Application.find({ tenant: id });

    res.status(200).json(applications);
};

export const getApplicationsByTradePoint = async (req, res) => {
    const { id } = req.params;

    const applications = await Application.find({ tradePoint: id });

    res.status(200).json(applications);
};