"use client";

import { useEffect, useState } from "react";

import Brand from "./Brand";
import LeftActions from "./LeftActions";
import RightActions from "./RightActions";
import MobileMenuDrawer from "./MobileMenuDrawer";
import MobileSearchSheet from "./MobileSearchSheet";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Always overlay on top */}
      <header
        className={[
          "fixed top-0 left-0 w-full z-50 transition-all pb-1 bg-background duration-300",
          scrolled
            ? "pt-1 md:pt-3 pb-2 md:pb-5 border-b-2 button-shadow border-foreground/30"
            : "border-b-2 border-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Brand Left */}
          <div className="flex md:hidden">
            <Brand />
          </div>

          {/* Desktop Left */}
          <div className="hidden md:flex w-1/3 items-center gap-3">
            <LeftActions
              openMenu={() => setMenuOpen(true)}
              openSearch={() => setSearchOpen(true)}
            />
          </div>

          {/* Desktop Brand Center */}
          <div className="hidden md:flex w-1/3 justify-center">
            <Brand />
          </div>

          {/* Mobile Icons Right */}
          <div className="flex md:hidden items-center gap-2">
            <RightActions mobileOnly={true} />
            <LeftActions
              openMenu={() => setMenuOpen(true)}
              openSearch={() => setSearchOpen(true)}
              mobileOnly={true}
            />
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex w-1/3 justify-end">
            <RightActions />
          </div>
        </nav>
      </header>

      {/* Mobile Components */}
      <MobileMenuDrawer open={menuOpen} closeMenu={() => setMenuOpen(false)} />

      <MobileSearchSheet
        open={searchOpen}
        closeSearch={() => setSearchOpen(false)}
      />
    </>
  );
}
