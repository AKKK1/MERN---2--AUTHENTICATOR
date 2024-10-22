import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
      
    verificationTokenExpiresAt:Date,
    resetVerificationToken: String,
    resetVerificationTokenExpiresAt:Date,
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);

