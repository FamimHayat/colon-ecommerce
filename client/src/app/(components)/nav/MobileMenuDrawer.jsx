"use client";

import Link from "next/link";
import { FiX } from "react-icons/fi";

export default function MobileMenuDrawer({ open, closeMenu }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 left-0 h-full w-[80%] max-w-sm bg-background p-5 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex gap-2 items-center border-b pb-3">
          <button
            onClick={closeMenu}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <FiX size={22} />
            <h2 className="font-bold text-lg ">Close</h2>
          </button>
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-col gap-4  lg:gap-6 text-xl lg:text-2xl">
          <Link
            href="/"
            onClick={closeMenu}
            className="transition-all hover:hover:ml-2"
          >
            Home
          </Link>

          <Link
            href="/shop"
            onClick={closeMenu}
            className="transition-all hover:ml-2"
          >
            men
          </Link>
          <Link
            href="/shop"
            onClick={closeMenu}
            className="transition-all hover:ml-2"
          >
            women
          </Link>
          <Link
            href="/shop"
            onClick={closeMenu}
            className="transition-all hover:ml-2"
          >
            kids
          </Link>
        </div>
        <div className="mt-16 flex flex-col gap-4 lg:gap-6 text-xl lg:text-2xl">
          <Link
            href="/contact"
            onClick={closeMenu}
            className="transition-all hover:ml-2"
          >
            Contact
          </Link>
          <Link
            href="/account"
            onClick={closeMenu}
            className="transition-all hover:ml-2"
          >
            Account
          </Link>
          <Link
            href="/"
            onClick={closeMenu}
            className="transition-all hover:hover:ml-2"
          >
            privacy & policy
          </Link>

          <Link
            href="/shop"
            onClick={closeMenu}
            className="transition-all hover:ml-2"
          >
            terms of service
          </Link>
        </div>
      </div>
    </div>
  );
}
