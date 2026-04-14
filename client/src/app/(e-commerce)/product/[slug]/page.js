import Image from "next/image";

const getProduct = async (slug) => {
  return {
    title: "Premium Hoodie",
    slug,
    description:
      "High-quality premium hoodie made with soft cotton blend. Perfect for everyday wear with modern street style.",
    price: 120,
    discountPercentage: 20,
    category: "Fashion",

    // ✅ make sure this is valid (local or full URL)
    thumbnail: "/product.jpg",
    images: ["/product.jpg", "/product.jpg", "/product.jpg", "/product.jpg"],

    tags: ["streetwear", "hoodie", "winter"],

    variants: [
      { sku: "HOD-RED-S", color: "Red", size: "s", stock: 5 },
      { sku: "HOD-BLK-M", color: "Black", size: "m", stock: 0 },
    ],
  };
};

export default async function Page({ params }) {
  const product = await getProduct(params.slug);

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="container mx-auto px-4 pb-24 md:pb-0">
      <section className="py-20 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT IMAGES */}
          <div className="space-y-4">
            <div className="relative w-full h-[450px] border border-border rounded-lg overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-24 border border-border rounded-md overflow-hidden"
                >
                  <Image
                    src={img}
                    alt="product image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              {product.title}
            </h1>

            <p className="text-sm text-muted-foreground mt-2">
              {product.category}
            </p>

            {/* PRICE */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-semibold text-foreground">
                ${discountedPrice.toFixed(2)}
              </span>

              {product.discountPercentage > 0 && (
                <span className="text-muted-foreground line-through">
                  ${product.price}
                </span>
              )}

              {product.discountPercentage > 0 && (
                <span className="text-green-600 text-sm">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-border px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* VARIANTS */}
            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-medium">Variants</h2>

              <div className="space-y-3">
                {product.variants.map((v) => (
                  <div
                    key={v.sku}
                    className="flex items-center justify-between border border-border p-3 rounded-md"
                  >
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {v.color} / {v.size.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SKU: {v.sku}
                      </p>
                    </div>

                    <div
                      className={`text-xs px-2 py-1 rounded ${
                        v.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {v.stock > 0 ? `${v.stock} in stock` : "Out of stock"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP CTA */}
            <div className="mt-10 hidden md:flex gap-4">
              <button className="px-6 py-3 bg-foreground text-background rounded-md hover:opacity-90">
                Add to Cart
              </button>

              <button className="px-6 py-3 border border-border rounded-md">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-350 border-t border-border bg-background p-3 flex gap-3">
        <button className="flex-1 py-3 border border-border rounded-md">
          Add to Cart
        </button>

        <button className="flex-1 py-3 bg-foreground text-background rounded-md">
          Buy Now
        </button>
      </div>
    </div>
  );
}
