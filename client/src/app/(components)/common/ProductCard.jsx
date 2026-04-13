import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";

export default function ProductCard({
  href = "/product/floral-jacquard-skirt",
  image = "/product.webp",
  title = "geometric shirt",
  price = "৳ 2000",
  imgWidth = 1200,
  imgHeight = 1600,
}) {
  return (
    <div className="w-full bg-background group  overflow-hidden flex flex-col">
      <div className="relative w-full overflow-hidden flex-1">
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-30 rounded-full cursor-pointer"
        >
          <FaHeart
            size={28}
            className="text-black/80 transition duration-200 hover:text-red-500 hover:scale-110"
          />
        </button>

        <Link
          href={href}
          className="block relative w-full h-full overflow-hidden"
        >
          <Image
            src={image}
            alt={title}
            width={imgWidth}
            height={imgHeight}
            priority={false}
            className="w-full h-full object-cover transition duration-500 ease-out transform group-hover:scale-105"
          />

          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="text-white text-xl md:text-3xl font-semibold">
              See
            </span>
          </div>
        </Link>
      </div>

      <div className="px-3 py-2 text-foreground bg-background">
        <Link href={href}>
          <p className="text-sm sm:text-base leading-snug">{title}</p>
        </Link>
        <p className="mt-1 text-sm">{price}</p>
      </div>
    </div>
  );
}
