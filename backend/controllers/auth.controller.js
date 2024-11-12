import crypto from "crypto";
import bcrypt from "bcryptjs";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


import {User} from "../models/user.model.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";





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


export const verifyEmail = async (req, res) => {

    const {code} =req.body;

    try {   //vamowmebt kodi verifikatiis kodi miigo tu ara. 

        const user = await User.findOne({verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        
        });
        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code "});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await sendWelcomeEmail(user.email, user.name);

     res.status(200).json({success: true, message: "Email verified successfully",
        user: {
            ...user._doc,
            password: undefined
        }
     });



    }
    catch (error) {
        console.log("error in verifyEmail", error);
        res.status(500).json({success: false, message: "error.message"});
    }
};

export const login = async (req, res) => { 
const {email, password} = req.body;

    try {

        const user = await User.findOne({ email});
        if(!user) {
            return res.status(400).json({success: false, message: "invalid credentials"});
        }
       const isPasswordValid = await bcrypt.compare(password, user.password);
        
if (!isPasswordValid) {
    return res.status(400).json({success: false, message: "invalid credentials"});
}
generateTokenAndSetCookie(res, user._id);
new Date();
await user.save();
res.status(200).json({success: true, message: "Logged in successfully", user: {
    ...user._doc,
    password: undefined
}});

    } catch (error) {

        console.log("error in login", error);
        res.status(400).json({success: false, message: "error.message"});
        
    }
}

export const logout = async (req, res) => {
    //cookies vasuptavebt marto
   res.clearCookie("token");
   res.status(200).json({success: true, message: "Logged out successfully"});
}

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


//reset gasasworebelia 
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const  checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");  //parols vasuptavebt
        
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }


        res.status(200).json({ success: true, user});
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }   
}

export const cssTest = async (req, res) => {

    
 }
