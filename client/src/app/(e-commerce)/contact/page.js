import { FaPhone, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-24 mt-15 md:mt-1 flex items-center justify-center bg-background">
      <div className="w-full max-w-5xl space-y-10 sm:space-y-14 text-center">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            HOW TO CONTACT US
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Choose your preferred contact method to get in touch. We respond
            quickly during working hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* PHONE */}
          <div className="border border-border rounded p-5 sm:p-6 space-y-4 hover:shadow-sm transition">
            <h2 className="font-medium text-base sm:text-lg">TELEPHONE</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              10:00 AM – 7:00 PM
            </p>

            <a
              href="tel:+4314240004"
              className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium underline underline-offset-4 py-2 w-full rounded-lg hover:bg-muted/40 transition"
            >
              <FaPhone className="shrink-0" />
              Call now
            </a>
          </div>

          {/* WHATSAPP */}
          <div className="border border-border rounded p-5 sm:p-6 space-y-4 hover:shadow-sm transition">
            <h2 className="font-medium text-base sm:text-lg">WHATSAPP</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              10:00 AM – 7:00 PM
            </p>

            <a
              href="https://wa.me/4314240004"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium underline underline-offset-4 py-2 w-full rounded-lg hover:bg-muted/40 transition"
            >
              <FaWhatsapp className="shrink-0" />
              Chat now
            </a>
          </div>

          {/* MESSENGER */}
          <div className="border border-border rounded p-5 sm:p-6 space-y-4 hover:shadow-sm transition sm:col-span-2 lg:col-span-1">
            <h2 className="font-medium text-base sm:text-lg">MESSENGER</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Fast response via Facebook
            </p>

            <a
              href="https://m.me/yourpageusername"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium underline underline-offset-4 py-2 w-full rounded-lg hover:bg-muted/40 transition"
            >
              <FaFacebookMessenger className="shrink-0" />
              <p className="w-fit">Message us</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
