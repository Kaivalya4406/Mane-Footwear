import Link from "next/link";
import ImagePlaceholder from "../UI/ImagePlaceholder";
import type { Product } from "../../types";
import { formatPrice } from "../../lib/formatPrice";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-light bg-white transition-shadow hover:shadow-md">
      <div className="relative">
        <ImagePlaceholder src={product.image} alt={product.name} kind={product.iconKind} aspectRatio="aspect-square" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-orange px-3 py-1 text-xs font-semibold text-navy">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-foreground/70">{product.category}</p>
        <h3 className="mt-1 text-base font-semibold text-navy">{product.name}</h3>
        <p className="mt-2 text-sm font-semibold text-orange-dark">{formatPrice(product.priceInPaise)}</p>
        <Link          href={`/products/${product.id}`}
          className="mt-4 inline-flex items-center justify-center rounded-full border border-navy px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-offwhite"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}