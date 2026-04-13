"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    text: "This product completely changed my workflow for the better!",
  },
  {
    id: 2,
    name: "John Smith",
    text: "Amazing quality and customer support. Highly recommended!",
  },
  {
    id: 3,
    name: "Alice Johnson",
    text: "I love it! The design and usability are top-notch.",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 px-3 sm:px-6 mt-10 md:mt-20 mb-10 md:mb-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-6xl font-semibold mb-9 md:mb-18 text-foreground">
          What our customers say
        </h2>

        <Splide
          options={{
            type: "fade",
            rewind: true,
            autoplay: true,
            interval: 3000,

            arrows: false,
            pagination: false,
            speed: 800,
          }}
        >
          {testimonials.map((item) => (
            <SplideSlide key={item.id}>
              <div className="max-w-xl mx-auto px-4">
                <p className="text-lg sm:text-3xl mb-4 md:mb-8">{item.text}</p>
                <span className="block font-bold text-foreground/80">
                  — {item.name}
                </span>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonial;
