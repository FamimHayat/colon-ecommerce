import Link from "next/link";
import { FiUser, FiPhone } from "react-icons/fi";
import ThemeToggle from "../utils/ThemeToggleButton";
import CartPopup from "./CartPopup";

export default function RightActions({ mobileOnly = false }) {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />

      <CartPopup />

      <Link
        href="/contact"
        className="p-1.5 border-2 border-foreground/70 rounded-full  transition-all hover:bg-foreground hover:text-background"
      >
        <FiPhone size={20} />
      </Link>

      <Link
        href="/account"
        className="p-1.5 border-2 border-foreground/70 rounded-full  transition-all hover:bg-foreground hover:text-background"
      >
        <FiUser size={20} />
      </Link>
    </div>
  );
}
