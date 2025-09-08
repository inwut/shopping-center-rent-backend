import TradePoint from "../models/tradePoint.js";
import createError from "http-errors";
import Lease from "../models/lease.js";

export const createTradePoint = async (req, res) => {
    const { floor, area, hasConditioner, dailyPrice } = req.body;

    const tradePoint = new TradePoint({
        floor,
        area,
        hasConditioner,
        dailyPrice
    });

    await tradePoint.save();

    res.status(201).json({
        message: "Successfully created trade point",
        tradePoint
    });
}

export const updateTradePoint = async (req, res, next) => {
    const { id } = req.params;
    const { floor, area, hasConditioner, dailyPrice } = req.body;

    const updated = await TradePoint.findByIdAndUpdate(
        id,
        { floor, area, hasConditioner, dailyPrice },
        { new: true, runValidators: true }
    );

    if (!updated) {
        return next(createError(404, "Trade point not found"));
    }

    res.status(200).json({
        message: "Successfully updated trade point",
        updated
    });
}

export const deleteTradePoint = async (req, res, next) => {
    const { id } = req.params;

    const deleted = await TradePoint.findByIdAndDelete(id);

    if (!deleted) {
        return next(createError(404, "Trade point not found"));
    }

    res.status(200).json({
        message: "Successfully deleted trade point",
    });
}

export const getAllTradePoints = async (req, res) => {
    const { floor, minArea, maxArea, hasConditioner, minPrice, maxPrice } = req.query;

    const filter = {};

    if (floor) filter.floor = floor;

    if (minArea || maxArea) {
        filter.area = {};
        if (minArea) filter.area.$gte = Number(minArea);
        if (maxArea) filter.area.$lte = Number(maxArea);
    }

    if (hasConditioner !== undefined) filter.hasConditioner = hasConditioner;

    if (minPrice || maxPrice) {
        filter.dailyPrice = {};
        if (minPrice) filter.dailyPrice.$gte = Number(minPrice);
        if (maxPrice) filter.dailyPrice.$lte = Number(maxPrice);
    }

    const tradePoints = await TradePoint.find(filter);

    const results = await Promise.all(
        tradePoints.map(async (tradePoint) => {
            const leases = await Lease.find({ tradePoint: tradePoint._id }).select("startDate endDate");
            const bookedPeriods = leases.map(l => ({
                startDate: l.startDate,
                endDate: l.endDate
            }));
            return {
                ...tradePoint.toObject(),
                bookedPeriods
            };
        })
    );

    res.status(200).json(results);
}