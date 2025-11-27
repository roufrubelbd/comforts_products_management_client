"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
  setLoading(true);
  signIn("google", { callbackUrl: "/" }); 
};

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const email = e.target.email.value;
  const password = e.target.password.value;

  const result = await signIn("credentials", {
    email,
    password,
    // redirect: false,
  });

  if (result?.error) {
    toast.error("Invalid credentials");
    setLoading(false);
    return;
  }

  toast.success("Login successful!");
  router.push("/");
};

  return (
    <div className="">
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-xl border border-blue-200 mt-10">
        <div className="card-body">
          <form className="fieldset" onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn text-black border-[#e5e5e5] bg-white hover:bg-blue-100 mt-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center text-sm mt-2">
            New here?
            <Link
              href="/register"
              className="link link-hover text-blue-500 ml-1"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="pb-8 mx-auto">
          <p className="mb-2 text-center">Or,</p>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] hover:bg-blue-100"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
