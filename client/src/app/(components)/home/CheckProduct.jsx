import React from "react";
import ProductCard from "../common/ProductCard";
import Link from "next/link";
import BrandLink from "../common/BrandLink";

const CheckProduct = () => {
  return (
    <section className="px-3 py-16 sm:py-20">
      <div className=" container">
        <h2 className=" text-center text-3xl sm:text-4xl text-foreground mb-18 text-shadow">
          elevate your style
        </h2>

        <div className="mt-8 grid  gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <ProductCard />
          <ProductCard image="/product2.webp" />
          <ProductCard image="/product5.webp" />
          <ProductCard image="/product3.webp" />
        </div>
      </div>
      <div className="mt-15 flex justify-center">
        <BrandLink href="/" text="discover more" />
      </div>
    </section>
  );
};

export default CheckProduct;
