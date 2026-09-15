import type { Metadata } from "next";
import ImagePlaceholder from "../../components/UI/ImagePlaceholder";
import BranchNetwork from "../../components/shared/BranchNetwork";
import FinalCTA from "../../components/shared/FinalCTA";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Story | MANE FOOTWEAR",
  description:
    "MANE FOOTWEAR is part of a family footwear business in Talegaon Dabhade, Maharashtra, with 50+ years of family footwear heritage.",
};

const VALUES = [
  { title: "Trust", body: "Built through generations of consistent, honest service to families across Talegaon Dabhade." },
  { title: "Quality", body: "We choose footwear for comfort and durability, not just appearance." },
  { title: "Personal Service", body: "A local, family-run approach where customers are known, not just served." },
  { title: "Value", body: "Fair, family-friendly pricing across every collection we offer." },
];

// Real MANE FOOTWEAR store photos are not yet available as project assets.
// Once provided, save them under public/images/legacy/ using the filenames
// below, then pass a matching `src` (e.g. "/images/legacy/store-exterior-signage.jpg")
// to the corresponding ImagePlaceholder — no other changes needed.
const STORE_HIGHLIGHTS = [
  { id: "exterior", alt: "MANE FOOTWEAR store exterior signage", caption: "Store Exterior" },
  { id: "sports", alt: "Sports footwear on display inside the MANE FOOTWEAR store", caption: "Sports Footwear" },
  { id: "womens", alt: "Women's footwear and sandals on display inside the MANE FOOTWEAR store", caption: "Women's Footwear" },
  { id: "formal", alt: "Formal footwear on display inside the MANE FOOTWEAR store", caption: "Formal Footwear" },
  { id: "counter", alt: "The MANE FOOTWEAR store counter", caption: "In-Store Experience" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-offwhite">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-10">
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">Our Story. Your Trust.</h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            MANE FOOTWEAR brings 50+ years of family footwear heritage to every
            customer who walks through our doors in Talegaon Dabhade.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 lg:px-10">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">About MANE FOOTWEAR</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            MANE FOOTWEAR is part of a family footwear business serving
            customers in Talegaon Dabhade, with 50+ years of family footwear
            heritage. As the flagship of that family business, MANE FOOTWEAR
            carries forward the same values of trust and service, offered
            through a modern footwear shopping experience.
          </p>
        </div>
      </section>

      <section className="bg-navy text-offwhite">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-2 md:items-center md:gap-16 md:py-20 lg:px-10">
          <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-lg border border-gold/30 bg-navy/60">
            <span className="text-6xl font-bold text-gold sm:text-7xl">50+</span>
            <span className="mt-2 text-sm font-medium text-offwhite/70 sm:text-base">
              Years of Family Footwear Heritage
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">A Family Legacy in Footwear</h2>
            <p className="mt-4 text-sm leading-relaxed text-offwhite/80 sm:text-base">
              MANE FOOTWEAR carries forward 50+ years of family footwear
              heritage in Talegaon Dabhade. Over the generations, the family
              has grown from a single store into multiple footwear retail
              locations across the town, while staying true to the same
              values of trust, quality and personal service.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20 lg:px-10">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Our Values</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-lg border border-gray-light bg-white p-5">
                <h3 className="text-base font-semibold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:px-8 lg:px-10">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Growing Across Talegaon Dabhade</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            What began as a single footwear store has grown, across
            generations, into a family business with multiple footwear
            retail locations throughout Talegaon Dabhade — each carrying
            forward the same commitment to trust, quality and personal
            service.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20 lg:px-10">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Inside Our Store</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 sm:grid-cols-3">
            {STORE_HIGHLIGHTS.map((photo) => (
              <div key={photo.id}>
                <ImagePlaceholder alt={photo.alt} kind="formal" aspectRatio="aspect-[4/3]" />
                <p className="mt-2 text-center text-xs text-foreground/60">
                  {photo.caption} — photo coming soon
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BranchNetwork />

      <FinalCTA />
    </>
  );
}