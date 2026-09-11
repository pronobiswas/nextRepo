import { NextResponse } from "next/server";
import { databaseConnection } from "@/db/dbconnection";
import User from "@/model/user.model";

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

        const existingUser = await User.findOne({ firstName });

        console.log(existingUser)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

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
