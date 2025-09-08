import Lease from "../models/lease.js";
import createError from "http-errors";

export const deleteLease = async (req, res, next) => {
    const { id } = req.params;

    const deleted = await Lease.findByIdAndDelete(id);

    if (!deleted) {
        return next(createError(404, "Lease not Found"));
    }

    res.status(200).json({
        message: "Lease deleted successfully",
    });
}

export const getAllLeases = async (req, res) => {
    const leases = await Lease.find()
        .populate("tenant", "_id")
        .populate("tradePoint", "_id");

    res.status(200).json(leases);
}

export const getLeasesByTenant = async (req, res) => {
    const { id } = req.params;

    const leases = await Lease.find({ tenant: id });

    res.status(200).json(leases);
}

export const getLeasesByTradePoint = async (req, res) => {
    const { id } = req.params;

    const leases = await Lease.find({ tradePoint: id });

    res.status(200).json(leases);
}

export const getMyLeases = async (req, res) => {
    const user = req.user;

    const leases = await Lease.find({tenant: user.id});

    res.status(200).json(leases);
}