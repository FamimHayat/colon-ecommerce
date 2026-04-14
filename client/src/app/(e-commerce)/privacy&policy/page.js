import React from "react";

const page = () => {
  return (
    <main className="bg-background text-foreground px-4 sm:px-6 md:px-10 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto pt-8 sm:pt-14 md:pt-20 mb-15">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-foreground/90">
            Last updated: March 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed ">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              1. Introduction
            </h2>
            <p>
              We respect your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, and safeguard your data when you visit our website or make a
              purchase from our fashion store.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p>When you use our website, we may collect:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Shipping and billing address</li>
              <li>
                Payment details (processed securely via payment providers)
              </li>
              <li>Order history and preferences</li>
              <li>Device information, IP address, and browsing behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p>Your information is used to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Process and deliver your orders</li>
              <li>Provide customer support</li>
              <li>Send order confirmations and updates</li>
              <li>Improve our products and shopping experience</li>
              <li>Send promotional offers (only if you opt in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              4. Payment Security
            </h2>
            <p>
              We do not store your full payment information. All transactions
              are securely processed through trusted third-party payment
              providers using encrypted technology.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              5. Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies to enhance your browsing experience, remember your
              preferences, and analyze website traffic. You can disable cookies
              in your browser settings, but some features may not function
              properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              6. Sharing of Information
            </h2>
            <p>
              We do not sell your personal information. We may share limited
              data with:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Shipping and logistics partners</li>
              <li>Payment processors</li>
              <li>Service providers who help operate our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your information only as long as necessary to fulfill
              orders, comply with legal obligations, and resolve disputes.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              8. Your Rights
            </h2>
            <p>
              Depending on your location, you may have the right to access,
              update, or request deletion of your personal information. You may
              contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              9. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at: support@yourbrand.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
