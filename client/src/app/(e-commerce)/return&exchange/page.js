import React from "react";

const page = () => {
  return (
    <main className="bg-background text-foreground">
      {/* hero */}
      <section className="px-6 pt-26 md:pt-35 pb-16 text-center border-b-2 border-b-foreground/20 mx-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Return & Exchange Policy
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          We want you to love what you wear. Please read our return policy
          carefully before requesting a return.
        </p>
      </section>

      {/* content */}
      <section className="px-6 py-14 max-w-4xl mx-auto space-y-10">
        {/* return policy */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">7 Days Return Policy</h2>
          <ul className="space-y-3 text-sm md:text-base text-muted-foreground list-disc pl-5">
            <li>
              Returns must be requested within <strong>7 days</strong> of
              receiving the product.
            </li>
            <li>
              Item must be unused, unwashed, and in original packaging with tags
              intact.
            </li>
            <li>
              After inspection, eligible returns will be processed accordingly.
            </li>
          </ul>
        </div>

        {/* exchange */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 pt-5">Exchange Policy</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Currently, we <strong>do not offer exchanges</strong>. If you need a
            different size or item, please place a new order.
          </p>
        </div>

        {/* damage */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 pt-5">
            Non-Returnable Conditions
          </h2>
          <ul className="space-y-3 text-sm md:text-base text-muted-foreground list-disc pl-5">
            <li>
              Products with <strong>burn damage</strong> are strictly not
              eligible for return or refund.
            </li>
            <li>
              Items damaged due to misuse, washing errors, or customer handling
              will not be accepted.
            </li>
            <li>
              Products returned without original condition or tags may be
              rejected.
            </li>
          </ul>
        </div>

        {/* process */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 pt-5">
            How to Request a Return
          </h2>
          <ol className="space-y-3 text-sm md:text-base text-muted-foreground list-decimal pl-5">
            <li>Contact our support team within 7 days of delivery.</li>
            <li>Provide your order number and product photos.</li>
            <li>Wait for return approval instructions.</li>
            <li>Ship the item back as instructed.</li>
          </ol>
        </div>

        {/* support */}
        <div className="bg-muted/40 rounded-2xl p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            Contact our support team for any return related questions.
          </p>
          <button className="mt-4 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition">
            Contact Support
          </button>
        </div>
      </section>
    </main>
  );
};

export default page;
