import LatestProductSlider from "../utils/LatestProductSlider";

const LatestProducts = () => {
  const products = [
    { id: 1, image: "/product.webp" },
    { id: 2, image: "/product2.webp" },
    { id: 3, image: "/product3.webp" },
    { id: 4, image: "/product4.webp" },
    { id: 5, image: "/product5.webp" },
    { id: 6, image: "/product6.webp" },
  ];

  return (
    <section className="px-3 py-16 sm:py-20">
      <div className="container">
        <h2 className="text-center text-3xl sm:text-4xl text-foreground mb-12 text-shadow">
          latest wardrobes
        </h2>

        <LatestProductSlider products={products} />
      </div>
    </section>
  );
};

export default LatestProducts;
