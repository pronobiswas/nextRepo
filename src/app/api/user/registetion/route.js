import { NextResponse } from "next/server";
import { databaseConnection } from "@/db/dbconnection";
import User from "@/model/user.model";
import { hashPassword, isValidEmail, isValidPassword } from "@/helpers/userhelper";


export async function POST(request) {
    try {
        console.log("Successfully hit registration");
        await databaseConnection();

        // Get request body
        const body = await request.json();
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = body;

        console.log("Request Body:", body);
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        if(!isValidEmail(email)){
            return NextResponse.json(
                {
                    success: false,
                    message: "invalid email",
                },
                { status: 400 }
            );
        }
         if(!isValidPassword(password)){
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }
        const hashedPassword = await hashPassword(password);

        const existingUser = await User.findOne({ email });
         if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "user already Exist",
                },
                { status: 400 }
            );
        }

        console.log(existingUser)
        // ===create user on db=====
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        });
        if(user){console.log(user)}

        return NextResponse.json(
            {
                success: true,
                message: "Successfully hit registration",
                data: {
                    firstName,
                    lastName,
                    email,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("User POST API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create user",
            },
            { status: 500 }
        );
    }
}
