"use client";
import React, { useState } from "react";

export default function AcceptCookies() {
  const [show, setShow] = useState(true); // always start visible

  const handleAccept = () => {
    setShow(false); // just hide it for this session
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background border border-background/20 rounded button-shadow p-4 md:p-6 w-[95%] max-w-md flex flex-col md:flex-row items-center justify-between gap-4 z-50">
      <p className="text-sm md:text-base text-background/80">
        We use cookies to enhance your experience. By continuing, you accept our
        cookie policy.
      </p>
      <button
        onClick={handleAccept}
        className="px-6 py-2 md:py-3 rounded bg-background text-foreground hover:opacity-90 transition cursor-pointer"
      >
        Accept
      </button>
    </div>
  );
}
