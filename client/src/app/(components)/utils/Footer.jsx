"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [openCookie, setOpenCookie] = useState(false);

  return (
    <>
      <footer className="bg-background text-foreground">
        <div className="mx-2 px-3 md:px-6 lg:px-14 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 border-t border-foreground/20">
          {/* brand */}
          <div>
            <h2 className="text-4xl font-semibold tracking-wide text-foreground">
              colon:
            </h2>
            <p className="mt-4 text-sm max-w-xs leading-relaxed text-foreground/70">
              Premium modern clothing crafted for confidence and everyday style.
              Elevate your wardrobe with timeless essentials.
            </p>

            {/* address */}
            <p className="mt-5 text-sm text-foreground/70 leading-relaxed">
              House 12, Road 3<br />
              Narsingdi Sadar
              <br />
              Narsingdi, Dhaka, Bangladesh
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-xl hover:text-foreground transition cursor-pointer hover:scale-110"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-xl hover:text-foreground transition cursor-pointer hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-xl hover:text-foreground transition cursor-pointer hover:scale-110"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* shop */}
          <div>
            <h3 className="text-2xl text-foreground font-medium mb-5">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* support */}
          <div>
            <h3 className="text-2xl text-foreground font-medium mb-5">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition cursor-pointer"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* newsletter */}
          <div>
            <h3 className="text-foreground text-2xl font-medium mb-5">
              Stay Updated
            </h3>
            <p className="text-sm text-foreground/70 mb-4">
              Subscribe to get special offers and fashion updates.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded bg-background border border-foreground/20 focus:outline-none focus:border-foreground text-sm text-foreground placeholder:text-foreground/50"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded bg-foreground text-background text-sm font-medium hover:opacity-90 transition cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mx-2 border-t border-foreground/20">
          <div className="px-3 md:px-6 lg:px-14 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
            <p>© {new Date().getFullYear()} colon. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-foreground transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition">
                Terms of Service
              </Link>
              <button
                onClick={() => setOpenCookie(true)}
                className="hover:text-foreground transition cursor-pointer"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* COOKIE MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          openCookie ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-modal={openCookie}
        role="dialog"
      >
        <div
          onClick={() => setOpenCookie(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />

        <div
          className={`relative bg-background text-foreground w-[95%] md:w-[800px] max-h-[90vh] overflow-y-auto rounded shadow-2xl p-8 transition-all duration-500 ${
            openCookie ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
          }`}
        >
          <button
            onClick={() => setOpenCookie(false)}
            className="absolute top-4 right-4 text-xl text-foreground/60 hover:text-foreground cursor-pointer"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold mb-6">
            Your Cookie Preferences
          </h2>

          <div className="space-y-6 text-sm text-foreground/70 leading-relaxed">
            {[
              {
                title: "Functional Cookies (Required)",
                desc: "These cookies are necessary for the website to function and cannot be switched off.",
              },
              {
                title: "Statistical Cookies",
                desc: "These cookies help us understand how visitors interact with the website.",
              },
              {
                title: "Personalization Cookies",
                desc: "Used to provide a more personalized shopping experience.",
              },
              {
                title: "Advertising Cookies",
                desc: "Used to show relevant advertisements across platforms.",
              },
            ].map((cookie) => (
              <div key={cookie.title}>
                <h3 className="font-medium text-foreground mb-2">
                  {cookie.title}
                </h3>
                <p>{cookie.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => setOpenCookie(false)}
              className="px-6 py-3 rounded border border-foreground/30 hover:bg-foreground/5 transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setOpenCookie(false)}
              className="px-6 py-3 rounded bg-foreground text-background hover:opacity-90 transition cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
