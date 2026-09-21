// app/verify/page.js

"use client";

import { useState } from "react";


export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setStatus({
        type: "error",
        message: "Please enter a valid 6-digit OTP.",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      // Replace with your API endpoint
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: data.message || "Email verified successfully!",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Invalid OTP.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await fetch("/api/resend-otp", {
        method: "POST",
      });

      setStatus({
        type: "success",
        message: "A new OTP has been sent.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Failed to resend OTP.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <span className="text-3xl">🔐</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Verify OTP
          </h1>

          <p className="text-slate-500 mt-2">
            Enter the 6-digit code sent to your email.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter OTP"
            className="w-full h-14 text-center text-2xl tracking-[0.5em] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {status && (
          <div
            className={`mt-5 rounded-xl p-4 flex gap-3 ${
              status.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {status.type === "success" ? (
              <div className="text-green-600 shrink-0" />
            ) : (
              <div className="text-red-600 shrink-0" />
            )}

            <p
              className={
                status.type === "success"
                  ? "text-green-700"
                  : "text-red-700"
              }
            >
              {status.message}
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </main>
  );
}