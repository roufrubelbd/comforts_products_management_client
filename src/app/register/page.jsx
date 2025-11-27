"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({ name, email, password })

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      //   console.log(data)

      if (!data.success) {
        toast.error("An error occurred. Please try again.");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully! Redirecting to login...");

      setLoading(false);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-xl border border-blue-200 mt-10">
        <div className="card-body">
          <form className="fieldset" onSubmit={handleRegister}>
            <label className="label">Full Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Your Name"
              required
            />

            <label className="label mt-2">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label mt-2">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="btn text-black border-[#e5e5e5] bg-white hover:bg-blue-100 mt-4"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
        </div>

        <div className="pb-5 text-center text-sm">
          Already have an account?
          <Link href="/login" className="link link-hover text-blue-500 ml-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
