"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed  mx-auto items-center bottom-5 right-5 z-50
        text-4xl lg:text-5xl  hover:scale-110 text-brand 
        border  cursor-pointer bg-black/30 md:bg-none 
        transform transition-all duration-300 ease-out
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
        hover:bg-brand hover:text-light text-glow text-shadow-light`}
    >
      <IoIosArrowRoundUp />
    </button>
  );
};

export default BackToTop;
