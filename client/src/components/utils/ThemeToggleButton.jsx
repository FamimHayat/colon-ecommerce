"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSunMedium } from "react-icons/lu";
import { FaCloudMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until client-side
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 cursor-pointer flex items-center justify-center"
      aria-label="Toggle Theme"
      type="button"
    >
      {isDark ? <LuSunMedium size={30} /> : <FaCloudMoon size={25} />}
    </button>
  );
}
