import ProductCard from "@/components/common/ProductCard";

const images = [
  "/product.webp",
  "/product2.webp",
  "/product3.webp",
  "/product4.webp",
  "/product5.webp",
  "/product6.webp",
];

// stable random image per product
const getImage = (id) => images[id % images.length];

const allProducts = Array.from({ length: 14 }).map((_, i) => {
  const id = i + 1;

  return {
    id,
    name: `Product ${id}`,
    price: [15, 25, 40, 60, 80, 120, 150][id % 7],
    category: ["Men", "Women", "Kids"][id % 3],
    image: getImage(id),
  };
});

export default function Page({ searchParams }) {
  const {
    category = "All",
    sort = "newest",
    page = 1,
    min = 0,
    max = 999,
  } = searchParams;

  const limit = 6;
  const currentPage = Number(page || 1);

  // ---------------- FILTER ----------------
  let filtered = [...allProducts];

  if (category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  filtered = filtered.filter(
    (p) => p.price >= Number(min) && p.price <= Number(max),
  );

  // ---------------- SORT ----------------
  if (sort === "price_low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price_high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "newest") filtered.sort((a, b) => b.id - a.id);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filtered.length / limit) || 1;

  const paginated = filtered.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  const categories = ["All", "Men", "Women", "Kids"];

  return (
    <section className="py-20 px-4 mt-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold text-foreground">Shop</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} products
        </p>
      </div>

      {/* SORT */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm">
        <a href="?sort=newest" className="hover:underline">
          Newest
        </a>
        <a href="?sort=price_low" className="hover:underline">
          Price ↑
        </a>
        <a href="?sort=price_high" className="hover:underline">
          Price ↓
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* FILTER */}
        <aside className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">Categories</h2>

            <div className="flex flex-col gap-2 text-sm">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`?category=${cat}&sort=${sort}&min=${min}&max=${max}&page=1`}
                  className="hover:underline"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-3">Price</h2>

            <div className="flex flex-col gap-2 text-sm">
              <a href="?min=0&max=50&page=1" className="hover:underline">
                Under $50
              </a>
              <a href="?min=50&max=100&page=1" className="hover:underline">
                $50 - $100
              </a>
              <a href="?min=100&max=200&page=1" className="hover:underline">
                $100+
              </a>
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.map((product) => (
              <ProductCard key={product.id} image={product.image} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center gap-3 mt-10 text-sm">
            {currentPage > 1 ? (
              <a
                href={`?page=${currentPage - 1}&category=${category}&sort=${sort}&min=${min}&max=${max}`}
                className="px-3 py-1 border hover:bg-black hover:text-white"
              >
                Prev
              </a>
            ) : (
              <span className="px-3 py-1 border opacity-40">Prev</span>
            )}

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;

              return (
                <a
                  key={i}
                  href={`?page=${pageNum}&category=${category}&sort=${sort}&min=${min}&max=${max}`}
                  className={`px-3 py-1 border ${
                    currentPage === pageNum
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {pageNum}
                </a>
              );
            })}

            {currentPage < totalPages ? (
              <a
                href={`?page=${currentPage + 1}&category=${category}&sort=${sort}&min=${min}&max=${max}`}
                className="px-3 py-1 border hover:bg-black hover:text-white"
              >
                Next
              </a>
            ) : (
              <span className="px-3 py-1 border opacity-40">Next</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
