"use client";

import { useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ProductCard from "../common/ProductCard";

export default function LatestProductSlider({ products }) {
  const splideRef = useRef(null);

  return (
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
          <ProductCard image={product.image} />
        </SplideSlide>
      ))}
    </Splide>
  );
}
