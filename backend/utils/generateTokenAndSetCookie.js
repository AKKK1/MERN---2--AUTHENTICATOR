import JWT from "jsonwebtoken";
import dotenv from "dotenv";


export const generateTokenAndSetCookie = (res, userId) => {
    const token = JWT.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});



    // dacvaa 
    res.cookie("token", token, {
        httpOnly: true, //XSS atackisgan gvicavs
        sameSite: "strict",  //csrf atackisgan gvicavs
        secure: process.env.NODE_ENV === "production", //only works on https
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    });

    return token;
}