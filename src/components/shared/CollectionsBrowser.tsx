"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import type { Collection, Product } from "../../types";

const ALL_CATEGORY = "all";

type CollectionsBrowserProps = {
  collections: Collection[];
  products: Product[];
};

export default function CollectionsBrowser({ collections, products }: CollectionsBrowserProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? ALL_CATEGORY;
  const [search, setSearch] = useState("");

  const filterOptions = [
    { id: ALL_CATEGORY, name: "All" },
    ...collections.map((c) => ({ id: c.id, name: c.name })),
  ];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || product.collectionId === activeCategory;
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, products]);

  function handleCategoryChange(categoryId: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === ALL_CATEGORY) {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    const query = params.toString();
    router.push(query ? `/collections?${query}` : "/collections", { scroll: false });
  }

  function handleClearFilters() {
    setSearch("");
    router.push("/collections", { scroll: false });
  }

  return (
    <div>
      <label htmlFor="product-search" className="sr-only">
        Search products by name or category
      </label>
      <input
        id="product-search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or category"
        className="w-full rounded-full border border-gray-light bg-white px-5 py-2.5 text-sm text-navy placeholder:text-foreground/40 focus:outline-none sm:max-w-xs"
      />

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {filterOptions.map((option) => {
          const isActive = option.id === activeCategory;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleCategoryChange(option.id)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-navy bg-navy text-offwhite"
                  : "border-gray-light bg-white text-navy hover:border-navy"
              }`}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-foreground/60">
        {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-foreground/60">
            No products match your search or selected category yet.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-offwhite"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}