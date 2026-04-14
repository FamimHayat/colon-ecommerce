"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export default function CartPopup() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // Close on outside click + ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onMouseDown = (e) => {
      if (!panelRef.current) return;
      if (open && !panelRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  // Demo cart items (replace with your real cart store)
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Classic T-Shirt",
      price: 499,
      qty: 1,
      image: "/product.webp",
      slug: "classic-tshirt",
      variant: "Black / M",
    },
    {
      id: 2,
      name: "Sneakers",
      price: 2199,
      qty: 1,
      image: "/product.webp",
      slug: "sneakers",
      variant: "White / 42",
    },
    {
      id: 3,
      name: "Sneakers",
      price: 2199,
      qty: 1,
      image: "/product.webp",
      slug: "sneakers",
      variant: "White / 42",
    },
    {
      id: 4,
      name: "Sneakers",
      price: 2199,
      qty: 1,
      image: "/product.webp",
      slug: "sneakers",
      variant: "White / 42",
    },
    {
      id: 5,
      name: "Sneakers",
      price: 2199,
      qty: 1,
      image: "/product.webp",
      slug: "sneakers",
      variant: "White / 42",
    },
    {
      id: 6,
      name: "Sneakers",
      price: 2199,
      qty: 1,
      image: "/product.webp",
      slug: "sneakers",
      variant: "White / 42",
    },
    {
      id: 7,
      name: "Sneakers",
      price: 2199,
      qty: 1,
      image: "/product.webp",
      slug: "sneakers",
      variant: "White / 42",
    },
  ]);

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  const inc = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );

  const dec = (id) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-full border-2 border-foreground/70 bg-background text-foreground hover:bg-foreground hover:text-background   transition-all relative cursor-pointer"
        aria-label="Open cart"
      >
        <FiShoppingCart size={20} />

        {/* badge */}
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Popup Panel */}
      <div
        className={[
          "fixed right-2 top-16 w-[calc(100vw-1rem)] max-w-sm",
          "md:absolute md:right-0 md:top-auto md:mt-3 md:w-[92vw]",
          "origin-top-right transition-all duration-200 z-50",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
        ].join(" ")}
      >
        <div className="rounded-2xl border border-background/50 bg-foreground text-background shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-background/50">
            <p className="font-semibold">Your Cart</p>
            <button
              type="button"
              className="p-2 rounded-full border border-background/50 hover:bg-background hover:text-foreground transition-all cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Close cart"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[55vh] overflow-auto">
            {items.length === 0 ? (
              <div className="p-6 text-sm opacity-70">Your cart is empty.</div>
            ) : (
              <ul className="divide-y divide-background">
                {items.map((it) => (
                  <li key={it.id} className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Product image LEFT */}
                      <Link
                        href={it.slug ? `/product/${it.slug}` : "/"}
                        onClick={() => setOpen(false)}
                        className="shrink-0"
                      >
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-background/50 bg-background">
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      {/* Info + controls */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={it.slug ? `/product/${it.slug}` : "/"}
                          onClick={() => setOpen(false)}
                          className="font-medium truncate block hover:underline"
                        >
                          {it.name}
                        </Link>

                        {it.variant && (
                          <p className="text-xs opacity-70 mt-1">
                            {it.variant}
                          </p>
                        )}

                        <p className="text-sm opacity-80 mt-1">
                          ৳{it.price} × {it.qty}
                        </p>

                        {/* Qty controls */}
                        <div className="mt-3 inline-flex items-center gap-2">
                          <button
                            className="p-2 rounded-full border border-background/50 hover:bg-background hover:text-foreground transition-all cursor-pointer"
                            onClick={() => dec(it.id)}
                            aria-label="Decrease quantity"
                            type="button"
                          >
                            <FiMinus size={16} />
                          </button>

                          <span className="w-8 text-center text-sm">
                            {it.qty}
                          </span>

                          <button
                            className="p-2 rounded-full border border-background/50 hover:bg-background hover:text-foreground transition-all cursor-pointer"
                            onClick={() => inc(it.id)}
                            aria-label="Increase quantity"
                            type="button"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => remove(it.id)}
                        className="p-2 rounded-full border border-background/50 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-background/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-70">Subtotal</span>
              <span className="font-semibold">৳{subtotal}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl border border-background/50 text-center hover:bg-background hover:text-foreground transition-all"
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl bg-background text-foreground text-center hover:opacity-90 transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
