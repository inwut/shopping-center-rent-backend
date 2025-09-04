import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    tradePoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TradePoint",
        required: true
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return new Date(value) >= Date.now();
            },
            message: "Start date must be after current date"
        }
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= this.startDate;
            },
            message: "End date must be after start date"
        }
    },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);

