import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tradePoints: { type: mongoose.Schema.Types.ObjectId, ref: "TradePoint", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);

