
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },

    LastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent OverwriteModelError during Next.js hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

