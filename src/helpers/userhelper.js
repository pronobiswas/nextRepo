import bcrypt from "bcryptjs";

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
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
}