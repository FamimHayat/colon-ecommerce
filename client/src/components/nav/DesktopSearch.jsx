import { FiSearch } from "react-icons/fi";

export default function DesktopSearch() {
  return (
    <div className="hidden md:flex items-center relative w-full max-w-xs">
      <FiSearch className="absolute left-3 text-gray-500" />

      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
    </div>
  );
}
