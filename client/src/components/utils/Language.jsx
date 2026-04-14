"use client";

import { useState, useRef, useEffect } from "react";
import { GrLanguage } from "react-icons/gr";

export default function Language() {
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
    <div
      ref={dropdownRef}
      className="absolute top-[12%] left-6 flex z-13 items-start gap-0.5 "
    >
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-background p-2 h-fit rounded-full text-xl lg:text-2xl hover:text-brand duration-150 cursor-pointer"
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
  );
}
