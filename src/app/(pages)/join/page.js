
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Sending data:", formData);

        try {
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
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

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
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
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
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Sign Up
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
