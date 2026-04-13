import React from "react";
import BrandLink from "../common/BrandLink";

const Parallax = () => {
  return (
    <section className="h-[50dvh] parallax">
      <div className="h-full flex flex-col gap-6 justify-center items-center">
        {" "}
        <p className="text-5xl md:text-9xl font-semibold text-white tracking-tight">
          Stay Stylish
        </p>
        <p className="text-xl md:text-3xl text-white text-center">
          Elevate Your Wardrobe with Trendy Fashion Picks
        </p>
        <BrandLink
          href="/"
          text={"shop now"}
          className="bg-background"
          rotate={-15}
        />
      </div>
    </section>
  );
};

export default Parallax;
