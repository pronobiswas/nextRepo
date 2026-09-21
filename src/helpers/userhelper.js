import bcrypt from "bcryptjs";
import { aleaRNGFactory } from "number-generator";
import jwt from "jsonwebtoken";
// Email validation
export const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,12}$/;


// Validate email
export function isValidEmail(email) {
    return emailRegex.test(email);
}


// Validate password
export function isValidPassword(password) {
    return passwordRegex.test(password);
}


// Hash password
export async function hashPassword(password) {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.log("password encription error")
    }
}

// OTP generator 
export async function MakeOtp() {
    try {
        return aleaRNGFactory(new Date()).uInt32().toString().slice(0, 4);
    } catch (error) {
        console.log("make otp error")
    }
};
// ===========make verification link;

export async function makeVerificationLink(email, uid) {
  try {
    const baseUrl = process.env.DOMAIN_NAME;

    const accessToken = jwt.sign(
      {
        email,
        uid,
      },
      process.env.ACCESS_TOKEN_SECRET || "8bCz-4buc",
      {
        expiresIn: "1d",
      }
    );

    const verificationLink = `${baseUrl}/verify/${accessToken}`;

    return verificationLink;
  } catch (error) {
    console.log("Create verification link error:", error);
    return null;
  }
}
