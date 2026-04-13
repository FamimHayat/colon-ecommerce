"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { GrLanguage } from "react-icons/gr";
import BrandLink from "../common/BrandLink";

const Banner = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="h-[100vh] w-full relative overflow-hidden flex">
      <div className="relative w-1/2 h-full ">
        <Image
          src="/banner1.webp"
          alt="Left Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative w-1/2 h-full">
        <Image
          src="/banner2.webp"
          alt="Right Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div
        ref={dropdownRef}
        className="absolute top-[12%] left-6 flex z-13 items-start gap-0.5"
      >
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-background p-2 h-fit rounded-full text-xl lg:text-2xl hover:text-brand duration-150"
        >
          <GrLanguage />
        </button>

        {dropdownOpen && (
          <ul className="mt-2 bg-white rounded shadow-lg w-32 text-left">
            <li className="px-4 py-1 text-black/90 hover:bg-gray-200 cursor-pointer font-jakarta">
              English
            </li>
            <li className="px-4 py-1 text-black/90 hover:bg-gray-200 cursor-pointer font-jakarta">
              বাংলা
            </li>
          </ul>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-12 px-4">
        <h1
          data-aos="fade-right"
          data-aos-delay="400"
          className="hidden sm:flex flex-col sm:text-[calc(30px+10vw)] text-white tracking-tighter font-semibold mt-20 leading-10 sm:leading-[calc(20px+6vw)] text-glow drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]"
        >
          stay stylish
          <br />
          stay trendy
        </h1>

        <h1 className="flex flex-col sm:hidden text-[118px] text-white tracking-tighter font-semibold leading-20 text-glow drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
          <span data-aos="fade-right" data-aos-delay="400">
            stay
          </span>
          <span data-aos="fade-left" data-aos-delay="500">
            stylish
          </span>
          <span data-aos="fade-right" data-aos-delay="600">
            stay
          </span>
          <span data-aos="fade-left" data-aos-delay="700">
            trendy
          </span>
        </h1>
        <div className="mt-10 md:mt-20">
          <BrandLink
            href="/"
            text="shop now"
            className="mt-10 bg-background"
            rotate={-14}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
