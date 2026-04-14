"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function BrandName() {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 0.25]);
  const y = useTransform(scrollYProgress, [0, 0.6], ["0%", "-35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section className="w-full relative mt-[4px] mb-8 flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.h1
        style={{ scale, y, opacity }}
        className="leading-none tracking-tight font-bold text-center text-[calc(40px+30vw)] pt-15 lg:pt-25 font-headerFont text-glow text-foreground"
      >
        colon:
      </motion.h1>
    </section>
  );
}
