"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Handbag } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="navbar bg-base-100/80 shadow-sm px-6 md:px-16 lg:px-24 sticky top-0 left-0 right-0 z-50">
      <div className="navbar-start">
        {/* <<------------small device dropdown menus------------->> */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* <<------------small device main menus------------->> */}
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
          </ul>
        </div>
        {/* <<------------logo------------->> */}
        <Link
          href="/"
          className="text-lg md:text-2xl font-extrabold text-teal-600 flex justify-center items-center gap-1"
        >
          <Handbag size={32} strokeWidth={3} />
          COMFORTS
        </Link>
      </div>
      {/* <<------------Large device main menus------------->> */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* <<------------auth buttons------------->> */}
      <ul className="navbar-end menu menu-horizontal px-1">
        {session ? (
          <li>
            <details>
              <summary className="text-teal-600 font-semibold hover:bg-teal-600 hover:text-white">
                Dashboard
              </summary>
              <ul className="p-4">
                <li>
                  <p className="text-teal-600 font-semibold">
                    {session?.user?.name}
                  </p>
                </li>
                <li>
                  <Link href="/add">Add Product</Link>
                </li>
                <li>
                  <Link href="/manage">Manage Product</Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="btn btn-outline btn-sm text-red-600 mt-3"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          </li>
        ) : (
          <li>
            <Link href="/login" className="btn btn-outline btn-sm text-teal-600 hover:bg-teal-600 hover:text-white">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
