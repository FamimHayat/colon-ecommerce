"use client";

import { useRef } from "react";
import ProductCard from "../common/ProductCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const LatestProducts = () => {
  const splideRef = useRef(null);

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

        <Splide
          ref={splideRef}
          options={{
            type: "slide",
            perPage: 4,
            perMove: 1,
            gap: "20px",
            arrows: false,
            pagination: true,
            drag: true,
            keyboard: "focused",
            breakpoints: {
              1024: { perPage: 3 },
              768: { perPage: 2 },
              640: { perPage: 1.3 },
            },
          }}
          className="!overflow-visible pb-6"
          aria-label="Latest products slider"
          tabIndex={0}
        >
          {products.map((product) => (
            <SplideSlide key={product.id}>
              <div>
                {" "}
                <ProductCard image={product.image} />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default LatestProducts;
