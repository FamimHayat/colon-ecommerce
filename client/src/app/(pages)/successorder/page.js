import React from "react";
import Image from "next/image";
import Link from "next/link";
import BrandButton from "@/app/(components)/common/BrandLink";

const page = () => {
  const order = {
    id: "ORD-10245",
    product: {
      name: "Premium Two-Tone Shirt",
      size: "M",
      color: "Red & Black",
      price: 2490,
      image: "/product5.webp",
    },
    quantity: 1,
    shipping: 100,
  };

  const subtotal = order.product.price * order.quantity;
  const total = subtotal + order.shipping;

  return (
    <main className="min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-10 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto pt-6 sm:pt-12 md:pt-20">
        {/* Success Message */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-sm sm:text-base text-foreground/70">
            Thank you for your purchase. Your order ID is{" "}
            <span className="font-medium">{order.id}</span>
          </p>
        </div>

        {/* Order Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 bg-card p-5 sm:p-8 rounded-lg shadow-sm border border-foreground/30 nav-shadow">
          {/* Product Image */}
          <div className="relative w-1/2 md:w-full h-44 sm:h-80 md:h-120 rounded overflow-hidden">
            <Image
              src={order.product.image}
              alt={order.product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                {order.product.name}
              </h2>

              <div className="space-y-2 text-sm sm:text-base text-foreground/80">
                <p>Size: {order.product.size}</p>
                <p>Color: {order.product.color}</p>
                <p>Quantity: {order.quantity}</p>
              </div>

              <div className="mt-6 border-t pt-5 space-y-2 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳ {order.shipping}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-semibold border-t pt-3">
                  <span>Total</span>
                  <span>৳ {total}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <BrandButton
                href="/shop"
                text="continue shopping"
                className="w-full button-shadow"
                rotate={-6}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
