import { NextResponse } from "next/server";
import User from "@/model/user.model";
import { databaseConnection } from "@/db/dbconnection";

export async function GET() {
    try {
        await databaseConnection();

        const users = await User.find().lean();

        return NextResponse.json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("User API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch users",
            },
            { status: 500 }
        );
    }
}


// ==========post to database=========
export async function POST(request) {
    try {
        await databaseConnection();

        // Get FormData
        const formData = await request.formData();

        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const password = formData.get("password");

        // Basic validation
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists",
                },
                { status: 409 }
            );
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                user,
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