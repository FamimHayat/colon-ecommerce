import React from "react";

const page = () => {
  return (
    <main className="bg-background text-foreground px-4 sm:px-6 md:px-10 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto pt-8 sm:pt-14 md:pt-20 mb-15">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl text-foreground/90 md:text-5xl font-semibold mb-4">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-foreground/90">
            Last updated: March 2026
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed ">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              1. Overview
            </h2>
            <p>
              By accessing and using our website, you agree to comply with and
              be bound by the following terms and conditions. If you do not
              agree with any part of these terms, please do not use our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              2. Products & Pricing
            </h2>
            <p>
              All prices listed are subject to change without notice. We reserve
              the right to modify or discontinue products at any time. We strive
              to ensure that product descriptions and pricing are accurate, but
              errors may occasionally occur.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              3. Orders & Payments
            </h2>
            <p>
              Once an order is placed, you will receive a confirmation email. We
              reserve the right to cancel or refuse any order if fraud or
              unauthorized activity is suspected.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              4. Shipping & Delivery
            </h2>
            <p>
              Delivery times are estimates and may vary due to circumstances
              beyond our control. We are not responsible for delays caused by
              courier services or external factors.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              5. Returns & Exchanges
            </h2>
            <p>
              Products may be returned or exchanged in accordance with our
              Return Policy. Items must be unused and in original condition.
              Refund eligibility is subject to inspection and approval.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              6. Intellectual Property
            </h2>
            <p>
              All content on this website including text, images, logos, and
              designs are the property of the brand and may not be reproduced
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages resulting from the use of our website or products.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these terms at any time.
              Continued use of the website after changes constitutes acceptance
              of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              9. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us through our support page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
