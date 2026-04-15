import BrandButton from "@/components/common/BrandButton";
import Image from "next/image";

export default async function Page() {
  const user = {
    name: "Famim Hayat",
    email: "famim@example.com",
  };

  const orders = [
    { id: 1, image: "/product.webp" },
    { id: 2, image: "/product2.webp" },
    { id: 3, image: "/product3.webp" },
  ];

  return (
    <main className="px-4 py-16 sm:py-20 mt-20">
      <div className="container max-w-6xl mx-auto">
        {/* USER HEADER */}
        <section className="flex flex-col sm:flex-row items-center gap-6 border-b border-border pb-10">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
              {user.name}
            </h1>

            <p className="text-muted-foreground mt-1">{user.email}</p>

            <div className="mt-4">
              <BrandButton
                text="edit profile"
                className="bg-background"
                rotate={-10}
              />
            </div>
          </div>
        </section>

        {/* ACCOUNT DETAILS */}
        <section className="mt-16 border-b border-border pb-10">
          <h2 className="text-xl sm:text-2xl font-medium mb-6 text-foreground">
            account details
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="text-foreground mt-1">{user.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Email Address</p>
              <p className="text-foreground mt-1">{user.email}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="text-foreground mt-1">0172XXXXXX</p>
            </div>

            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="text-foreground mt-1">uttara, dhaka</p>
            </div>
          </div>
        </section>

        {/* ORDERS (LIST VIEW) */}
        <section className="mt-14">
          <h2 className="text-xl sm:text-3xl font-medium mb-8 text-foreground">
            recent orders
          </h2>

          <div className="flex flex-col gap-4">
            {orders.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-2 border-border p-3 rounded border-foreground/30"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.image}
                      alt="order"
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="text-sm">
                    <p className="text-foreground font-medium">
                      Classic Cotton T-Shirt
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Order #{item.id} • Qty: 1
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-right text-sm">
                  <p className="text-foreground font-medium">$29.99</p>
                  <p className="text-green-600 text-xs">Delivered</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
