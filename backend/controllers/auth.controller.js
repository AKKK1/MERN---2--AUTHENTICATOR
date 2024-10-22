import express from "express";
import {User} from "../models/user.model.js";

import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";





// vawyobt registraciis kods 
export const signup = async (req, res) => {
    const {email, password, name} = req.body;  
   try {
    if(!email || !password || !name) {
        throw new Error("All fields are required");
    } 
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists) {
       return res.status(400).json({error: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();   // <-- utilidan mogvaqvs kodi

    const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000  // 24 hours
    });
    await user.save();
  
      //jwt

      generateTokenAndSetCookie(res, user._id);



    await  sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: { 
                ...user._doc,
                password: undefined
            }});



    } catch (error) {
       res.status(400).json({error: error.message});
    }
}




export const login = async (req, res) => {
    res.send("login route");
}

export const logout = async (req, res) => {
    res.send("logout route");
}