import { getProducts } from "../../lib/data/products";
import ProductCard from "./ProductCard";

export default function RelatedProducts({
  currentProductId,
  collectionId,
}: {
  currentProductId: string;
  collectionId: string;
}) {
  const products = getProducts();
  const related = products
    .filter((product) => product.collectionId === collectionId && product.id !== currentProductId)
    .slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  const gridClass =
    related.length === 1
      ? "grid-cols-1 max-w-xs"
      : related.length === 2
      ? "grid-cols-2 max-w-md sm:max-w-xl"
      : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className="mt-16 border-t border-gray-light pt-10">
      <h2 className="text-xl font-bold text-navy sm:text-2xl">You Might Also Like</h2>
      <div className={`mt-6 grid gap-5 sm:gap-6 ${gridClass}`}>
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
