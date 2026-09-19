"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "../../lib/formatPrice";
import type { Product } from "../../types";

export default function AdminProductsList({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (query === "") return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [products, search]);

  return (
    <div>
      <label htmlFor="admin-product-search" className="sr-only">
        Search products by name or category
      </label>
      <input
        id="admin-product-search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or category"
        className="w-full rounded-full border border-gray-light bg-white px-5 py-2.5 text-sm text-navy placeholder:text-foreground/40 focus:outline-none sm:max-w-xs"
      />

      <p className="mt-4 text-sm text-foreground/60">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-lg border border-gray-light bg-white py-16 text-center">
          <p className="text-sm text-foreground/60">No products match your search.</p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-offwhite"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden overflow-hidden rounded-lg border border-gray-light bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-light bg-offwhite">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy">Name</th>
                  <th className="px-4 py-3 font-semibold text-navy">Category</th>
                  <th className="px-4 py-3 font-semibold text-navy">Price</th>
                  <th className="px-4 py-3 font-semibold text-navy">Status</th>
                  <th className="px-4 py-3 font-semibold text-navy">Edit</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-gray-light last:border-0">
                    <td className="px-4 py-3 font-medium text-navy">{product.name}</td>
                    <td className="px-4 py-3 text-foreground/70">{product.category}</td>
                    <td className="px-4 py-3 text-foreground/70">{formatPrice(product.priceInPaise)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge isActive={product.isActive} />
                    </td>
                    <td className="px-4 py-3">
                      <EditAffordance />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="mt-6 space-y-3 md:hidden">
            {filtered.map((product) => (
              <div key={product.id} className="rounded-lg border border-gray-light bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-navy">{product.name}</p>
                    <p className="mt-0.5 text-xs text-foreground/60">{product.category}</p>
                  </div>
                  <StatusBadge isActive={product.isActive} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-orange-dark">
                    {formatPrice(product.priceInPaise)}
                  </p>
                  <EditAffordance />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isActive ? "bg-navy text-offwhite" : "bg-gray-light text-foreground/50"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function EditAffordance() {
  return (
    <span aria-disabled="true" className="inline-flex items-center gap-1.5 text-sm text-foreground/40">
      Edit
      <span className="rounded-full bg-gray-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/50">
        Soon
      </span>
    </span>
  );
}