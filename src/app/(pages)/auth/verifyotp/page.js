"use client";

import { useRef } from "react";

export default function VerifyOTPPage() {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    if (e.target.value && index < 4) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Verify OTP
          </h1>
          <p className="text-gray-500 mt-2">
            Enter the 5-digit code sent to your email
          </p>
        </div>

        <form className="mt-8">
          <div className="flex justify-center gap-3">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                maxLength="1"
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}