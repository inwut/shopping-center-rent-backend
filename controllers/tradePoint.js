import TradePoint from "../models/tradePoint.js";
import createError from "http-errors";

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
    })
}

export const getAllTradePoints = async (req, res) => {
    const tradePoints = await TradePoint.find();

    res.status(200).json(tradePoints);
}