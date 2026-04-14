import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <section className="py-20 px-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-0">
        <Link
          href="/category/men"
          className="relative w-full aspect-[4/5] block"
        >
          <Image
            src="/men.webp"
            alt="Men category"
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   25vw"
            className="object-contain"
          />
        </Link>

        <Link
          href="/category/women"
          className="relative w-full aspect-[4/5] block"
        >
          <Image
            src="/women.webp"
            alt="Women category"
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   25vw"
            className="object-contain"
          />
        </Link>

        <Link
          href="/category/kids"
          className="relative w-full aspect-[4/5] block"
        >
          <Image
            src="/kid.webp"
            alt="Kids category"
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   25vw"
            className="object-contain"
          />
        </Link>

        <div className="flex justify-center items-center">
          <Link
            href="/"
            className="relative text-3xl md:text-6xl tracking-tighter   
                       after:absolute after:left-0 after:bottom-0
                       after:h-[4px] after:w-full after:bg-foreground
                       after:scale-x-0 after:origin-left
                       after:transition-transform after:duration-300
                       hover:after:scale-x-100"
          >
            shop now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;
