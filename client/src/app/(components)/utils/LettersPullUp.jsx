"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

export function LettersPullUp({ text, className = "" }) {
  const letters = useMemo(() => text.split(""), [text]);

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.03,
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const child = {
    hidden: { y: 15, opacity: 0, willChange: "transform, opacity" },
    show: { y: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <motion.div
      key={text}
      className="flex justify-center"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {letters.map((char, i) => (
        <motion.span key={i} variants={child} className={`${className} `}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
