import BrandLink from "../common/BrandLink";

const FreshCollection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[40dvh] lg:min-h-[70dvh] flex items-center justify-center "
      style={{ backgroundImage: "url('/fresh.webp')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
      {/* content */}
      <div className="relative text-white text-4xl lg:text-8xl text-shadow font-semibold">
        Fresh Collection
        <div className=" mt-10 md:mt-7 text-center">
          <BrandLink
            href="/"
            text="shop now"
            className=" bg-background"
            rotate={-14}
          />
        </div>
      </div>
    </section>
  );
};

export default FreshCollection;
