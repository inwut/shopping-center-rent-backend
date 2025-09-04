import mongoose from "mongoose";

const tradePointSchema = new mongoose.Schema({
    floor: { type: Number, required: true, min: 1 },
    area: { type: Number, required: true, min: 1 },
    hasConditioner: { type: Boolean, required: true },
    dailyPrice: { type: Number, required: true, min: 1 },
}, { timestamps: true });

export default mongoose.model("TradePoint", tradePointSchema);
