import mongoose from "mongoose";
import { Manager } from "../models/user.js";
import bcrypt from "bcrypt";

const seedManager = async () => {
    const existing = await Manager.findOne({ email: process.env.MANAGER_EMAIL });
    if (existing) return;

    const hashedPassword = await bcrypt.hash(process.env.MANAGER_PASSWORD, 10);

    const manager = new Manager({
        email: process.env.MANAGER_EMAIL,
        password: hashedPassword
    });

    await manager.save();
}

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await seedManager();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};