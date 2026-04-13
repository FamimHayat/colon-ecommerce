"use client";

import { useState } from "react";
import Link from "next/link";
import BrandButton from "@/app/(components)/common/BrandButton";

export default function Page() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
      } else {
        alert("Login successful");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-foreground p-8 rounded nav-shadow">
        <h1 className="text-3xl font-semibold text-background text-center mb-6">
          Sign In to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-background">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <BrandButton
            type="submit"
            text={loading ? "Signing in..." : "Sign In"}
            className=" border-2 border-background w-full text-center bg-background"
            rotate={-6}
            disabled={loading}
          />
        </form>

        <p className="text-sm text-center mt-6 text-background">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium underline hover:opacity-80"
          >
            signup
          </Link>
        </p>
      </div>
    </main>
  );
}
