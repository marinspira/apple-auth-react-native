import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
