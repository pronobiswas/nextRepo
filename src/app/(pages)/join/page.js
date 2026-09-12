
"use client";

import { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Password validation
    const password = formData.password;

    const passwordRules = {
        length: password.length >= 6 && password.length <= 12,
        letter: /[A-Za-z]/.test(password),
        number: /\d/.test(password),
        symbol: /[^A-Za-z\d]/.test(password),
    };

    const passwordValid = Object.values(passwordRules).every(Boolean);

    const passwordsMatch =
        formData.confirmPassword.length > 0 &&
        formData.password === formData.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = formData;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert("All fields are required!");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        if (!passwordValid) {
            alert(
                "Password must be 6-12 characters and contain a letter, number, and symbol."
            );
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/user/registetion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            console.log("Server response:", result);

            if (result.success) {
                alert("Account created successfully!");

                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Reusable rule component
    const PasswordRule = ({ valid, children }) => (
        <li
            className={`flex items-center gap-2 ${
                valid ? "text-green-600" : "text-gray-500"
            }`}
        >
            <span
                className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                    valid
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-400"
                }`}
            >
                {valid ? "✓" : "!"}
            </span>

            <span>{children}</span>
        </li>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
                    Create an Account
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Sign up to get started
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* First Name */}
                    <div>
                        <label
                            htmlFor="firstName"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor="lastName"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            minLength={6}
                            maxLength={12}
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                                password.length > 0
                                    ? passwordValid
                                        ? "border-green-500 focus:border-green-600"
                                        : "border-red-400 focus:border-red-500"
                                    : "border-gray-300 focus:border-black"
                            }`}
                        />

                        {/* Live Password Guidelines */}
                        <div className="mt-2 rounded-lg bg-gray-50 p-3">
                            <p className="mb-2 text-xs font-semibold text-gray-700">
                                Password requirements:
                            </p>

                            <ul className="space-y-1 text-xs">
                                <PasswordRule valid={passwordRules.length}>
                                    6–12 characters
                                </PasswordRule>

                                <PasswordRule valid={passwordRules.letter}>
                                    At least one letter (A–Z or a–z)
                                </PasswordRule>

                                <PasswordRule valid={passwordRules.number}>
                                    At least one number (0–9)
                                </PasswordRule>

                                <PasswordRule valid={passwordRules.symbol}>
                                    At least one special symbol (!, @, #, $...)
                                </PasswordRule>
                            </ul>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                                formData.confirmPassword.length > 0
                                    ? passwordsMatch
                                        ? "border-green-500 focus:border-green-600"
                                        : "border-red-400 focus:border-red-500"
                                    : "border-gray-300 focus:border-black"
                            }`}
                        />

                        {/* Confirm Password Warning */}
                        {formData.confirmPassword.length > 0 && (
                            <p
                                className={`mt-1 text-xs ${
                                    passwordsMatch
                                        ? "text-green-600"
                                        : "text-red-500"
                                }`}
                            >
                                {passwordsMatch
                                    ? "✓ Passwords match"
                                    : "⚠ Passwords do not match"}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !passwordValid || !passwordsMatch}
                        className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="font-semibold text-black hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;

