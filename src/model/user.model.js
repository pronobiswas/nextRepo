
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user", "owner"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: Number,
      default: null,
    },

    verifiedToken: {
      type: String,
      default: null,
    },

    verifiedTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent OverwriteModelError during Next.js hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

