import type { Metadata } from "next";
import { getBranches } from "../../lib/data/branches";
import { siteContact, whatsappHref, mapsHref } from "../../data/contact";
import BranchCard from "../../components/shared/BranchCard";
export const metadata: Metadata = {
  title: "Contact Us | MANE FOOTWEAR",
  description:
    "Contact MANE FOOTWEAR in Talegaon Dabhade by phone, WhatsApp or email — 9156310198 / manefootwear4406@gmail.com.",
};

export default async function ContactPage() {
  const branches = await getBranches();

  return (
    <>
      <section className="bg-offwhite">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-10">
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">Let&apos;s Connect</h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            Have a question about our footwear collection or looking for the
            right pair? Get in touch with MANE FOOTWEAR.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="rounded-lg border border-gray-light bg-offwhite p-6 sm:p-8">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">{siteContact.name}</h2>

            <dl className="mt-6 space-y-3 text-sm text-foreground/80 sm:text-base">
              <div>
                <dt className="inline font-medium text-navy">Phone: </dt>
                <dd className="inline">{siteContact.phone}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-navy">Email: </dt>
                <dd className="inline">{siteContact.email}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-navy">Location: </dt>
                <dd className="inline">{siteContact.location}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteContact.phoneHref}
                className="inline-flex items-center justify-center rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-offwhite"
              >
                Call Us
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-orange-dark"
              >
                WhatsApp Us
              </a>
              <a
                href={`mailto:${siteContact.email}`}
                className="inline-flex items-center justify-center rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-offwhite"
              >
                Email Us
              </a>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-offwhite"
              >
                View Location
              </a>
            </div>

            <p className="mt-4 text-xs text-foreground/60">
              &ldquo;View Location&rdquo; opens a Google Maps search and is not a
              verified exact address pin.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">Our Family Footwear Stores</h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70">
            MANE FOOTWEAR is the flagship of a wider family footwear
            business. These related stores are also part of that family
            business, serving Talegaon Dabhade.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}