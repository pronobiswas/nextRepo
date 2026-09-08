
import { databaseConnection } from "@/db/dbconnection";
import User from "@/model/user.model";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    await databaseConnection();

    const users = await User.find({}).lean();

    return NextResponse.json(
      {
        success: true,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}

