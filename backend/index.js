import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));  // allows cross-origin requests: req.headers.origin

app.use(express.json());   //allows to parce incoming request: req.body

app.use(cookieParser());   // allows to parse incoming cookies: req.cookies

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started on port " + PORT);
}); 