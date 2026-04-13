import { FiMenu, FiSearch } from "react-icons/fi";
import DesktopSearch from "./DesktopSearch";

export default function LeftActions({
  openMenu,
  openSearch,
  mobileOnly = false,
}) {
  return (
    <>
      {/* Menu Button */}
      <button
        onClick={openMenu}
        className="hidden md:flex p-1.5 border-2 border-foreground/70 rounded-full  transition-all hover:bg-foreground hover:text-background cursor-pointer"
      >
        <FiMenu size={20} />
      </button>

      {/* Search Button */}
      <button
        onClick={openSearch}
        className="p-1.5 border-2 border-foreground/70 rounded-full  transition-all hover:bg-foreground hover:text-background cursor-pointer"
      >
        <FiSearch size={20} />
      </button>

      <button
        onClick={openMenu}
        className="md:hidden p-1.5 border-2 border-foreground/70 rounded-full transition-all hover:bg-foreground hover:text-background cursor-pointer"
      >
        <FiMenu size={20} />
      </button>
    </>
  );
}
