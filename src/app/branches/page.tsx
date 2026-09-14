import type { Metadata } from "next";
import Link from "next/link";
import { getBranches } from "../../lib/data/branches";
import BranchCard from "../../components/shared/BranchCard";

export const metadata: Metadata = {
  title: "Our Stores | MANE FOOTWEAR",
  description:
    "MANE FOOTWEAR is the flagship of a wider family footwear business with stores across Talegaon Dabhade, Maharashtra.",
};

export default function BranchesPage() {
  const branches = getBranches();

  return (
    <>
      <section className="bg-offwhite">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-10">
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">
            Our Stores Across Talegaon Dabhade
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            MANE FOOTWEAR is the flagship of a wider family footwear
            business. The stores below are related footwear stores run by
            the same family, serving Talegaon Dabhade.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:px-8 lg:px-10">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            One Family, Serving Talegaon Dabhade
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            These stores represent a wider family footwear business built
            across generations. MANE FOOTWEAR remains the flagship,
            carrying forward the same values of trust, quality and
            personal service found across the family&apos;s stores.
          </p>
        </div>
      </section>

      <section className="bg-navy text-offwhite">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Looking for the Right Pair?</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/collections"
              className="inline-flex w-full items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-orange-dark sm:w-auto"
            >
              Explore Collections
            </Link>
            <Link
              href="/about"
              className="inline-flex w-full items-center justify-center rounded-full border border-offwhite px-6 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-offwhite hover:text-navy sm:w-auto"
            >
              About Our Story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}