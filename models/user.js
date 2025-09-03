import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        discriminatorKey: "role",
        timestamps: true
    }
);

const tenantSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    requisites: { type: String, required: true },
    contactPerson: { type: String, required: true }
});

const managerSchema = new mongoose.Schema({});

const User = mongoose.model("User", userSchema);
export const Tenant = User.discriminator("tenant", tenantSchema);
export const Manager = User.discriminator("manager", managerSchema);

