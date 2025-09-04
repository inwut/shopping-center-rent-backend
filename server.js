import express from 'express';
import dotenv from 'dotenv';
import passport from "passport";
import { connectDB } from "./config/db.js";
import { initPassport } from "./config/passport.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import tradePointRoutes from "./routes/tradePoint.js";

const PORT = process.env.PORT || 3000;

dotenv.config({ path: `${process.cwd()}/.env` });
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());
initPassport(passport);

app.use("/api", authRoutes);
app.use("/api/trade-point", tradePointRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: `Can't find ${req.originalUrl} on this server` });
});

app.use(globalErrorHandler);

(async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();