import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema({
    tradePoints: { type: mongoose.Schema.Types.ObjectId, ref: "TradePoint", required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    monthlyPayment: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Lease", leaseSchema);
