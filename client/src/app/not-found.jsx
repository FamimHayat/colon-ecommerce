"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-background px-6">
      <div className="text-center ">
        <h1 className="mt-3 text-3xl  font-bold tracking-tight text-foreground text-shadow sm:text-4xl md:text-6xl mb-15">
          404 : Page not found
        </h1>

        <p className="mt-3 text-base text-foreground">
          Sorry, we couldn’t find that page you’re looking for.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded bg-foreground px-4 py-2 text-sm font-semibold text-background duration-150  hover:bg-foreground/80"
          >
            Go home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-foreground bg-background duration-150  hover:scale-102 cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
