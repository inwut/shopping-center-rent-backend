import mongoose from "mongoose";

const tradePointSchema = new mongoose.Schema({
    floor: { type: Number, required: true },
    area: { type: Number, required: true },
    hasConditioner: { type: Boolean, required: true },
    dailyPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("TradePoint", tradePointSchema);
