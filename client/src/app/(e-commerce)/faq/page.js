"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy from the date of delivery. Items must be unused, unwashed, and returned with original tags and packaging.",
  },
  {
    question: "Do you offer exchanges?",
    answer:
      "Currently, we do not offer exchanges. If you need a different size or product, please place a new order.",
  },
  {
    question: "Are burn damaged items eligible for return?",
    answer:
      "No. Products with burn damage are strictly not eligible for return or refund.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 2–5 business days inside the country depending on your location.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After your order is shipped, you will receive a tracking number via SMS or email to monitor your delivery status.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Cash on Delivery (COD), mobile banking, and selected online payment methods.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled before they are shipped. Once shipped, cancellation is not possible.",
  },
  {
    question: "Do you restock sold-out items?",
    answer:
      "Some popular items are restocked. Follow our social media pages or subscribe to updates for restock notifications.",
  },
  {
    question: "How should I care for my clothing?",
    answer:
      "Please follow the wash care instructions mentioned on the product label to maintain fabric quality and color.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team through the Contact page or our official social media accounts.",
  },
];

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* header */}
      <section className="px-6 pt-26 md:pt-35 pb-16 text-center border-b-2 border-foreground/20 mx-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about orders, returns, delivery and more.
        </p>
      </section>

      {/* faq */}
      <section className="px-6 py-14 max-w-3xl mx-auto ">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="border border-foreground/20 rounded-2xl overflow-hidden transition-all duration-300 button-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-medium hover:bg-muted/40 transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Page;
