"use client";

export default function BrandButton({
  type = "button",
  onClick,
  text,
  rotate = -11,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-block overflow-hidden border border-background px-6 py-3 font-medium text-foreground text-xl transition-colors duration-200 cursor-pointer group disabled:opacity-50 ${className}`}
    >
      <span
        className="absolute -inset-[120%] z-0 bg-foreground origin-bottom-left scale-x-0 transition-transform duration-200 ease-out lg:group-hover:scale-x-100"
        style={{ transform: `rotate(${rotate}deg)` }}
      />

      <span className="relative z-10 transition-colors duration-200 lg:group-hover:text-background">
        {text}
      </span>
    </button>
  );
}
