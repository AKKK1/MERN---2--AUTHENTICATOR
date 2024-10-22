import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        const  connection  = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.host}`);
        console.log(`mongodb URI: ${process.env.MONGO_URI}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}