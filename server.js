import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config({ path: `${process.cwd()}/.env` });

const PORT = process.env.PORT || 3000;

const app = express();

(async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();