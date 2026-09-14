import { getProducts } from "../../lib/data/products";
import FeaturedProductCard from "./FeaturedProductCard";

export default function FeaturedProducts() {
  const products = getProducts();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Featured Products</h2>
          <p className="mt-3 text-sm text-foreground/70 sm:text-base">
            A few sample styles from our in-store range. Prices shown are indicative placeholders.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}