import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImagePlaceholder from "../../../components/UI/ImagePlaceholder";
import RelatedProducts from "../../../components/shared/RelatedProducts";
import { getProductById } from "../../../lib/data/products";
import { formatPrice } from "../../../lib/formatPrice";

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Product Not Found | MANE FOOTWEAR" };
  }

  return {
    title: `${product.name} | MANE FOOTWEAR`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20 lg:px-10">
        <Link
          href="/collections"
          className="text-sm font-medium text-navy hover:underline"
        >
          ← Back to Collections
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
          <ImagePlaceholder
            src={product.image}
            alt={product.name}
            kind={product.iconKind}
            aspectRatio="aspect-square"
            className="w-full"
            iconClassName="h-32 w-36 sm:h-40 sm:w-44"
          />

          <div>
            <p className="text-sm font-medium text-foreground/70">{product.category}</p>
            <h1 className="mt-1 text-2xl font-bold text-navy sm:text-3xl">{product.name}</h1>

            {product.badge && (
              <span className="mt-3 inline-block rounded-full bg-orange px-3 py-1 text-xs font-semibold text-navy">
                {product.badge}
              </span>
            )}
            <p className="mt-4 text-lg font-semibold text-orange-dark">{formatPrice(product.priceInPaise)}</p>

            <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              {product.description}
            </p>

            <p className="mt-6 text-xs text-foreground/60">
              This is a demo catalogue listing. Availability may vary — please enquire with our team.
            </p>

            <div className="mt-6">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border-2 border-navy bg-white px-6 py-3 text-sm font-semibold text-navy sm:w-auto"
              >
                Product Enquiry — Coming Soon
              </button>
              <p className="mt-2 text-xs text-foreground/60">
                Online enquiries aren&apos;t available yet. Please visit one of our stores in the meantime.
              </p>
            </div>
          </div>
        </div>

        <RelatedProducts currentProductId={product.id} collectionId={product.collectionId} />
      </div>
    </section>
  );
}