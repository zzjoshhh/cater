import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { connectToDB } from "./config/db.js";
 
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"});

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });


const app = express();
app.use(express.json());
app.use(cors());

connectToDB();

// Use auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));