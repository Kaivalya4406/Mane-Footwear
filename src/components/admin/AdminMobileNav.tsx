"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", available: true },
  { label: "Products", href: "/admin/products", available: true },
  { label: "Inventory", available: false },
  { label: "Orders", available: false },
  { label: "Customers", available: false },
  { label: "Branches", available: false },
  { label: "Offers", available: false },
  { label: "Reviews", available: false },
  { label: "Settings", available: false },
];

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-light bg-white px-6 py-3 md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="admin-mobile-menu"
        className="inline-flex items-center gap-2 text-sm font-medium text-navy"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        </svg>
        Menu
      </button>

      {isOpen && (
        <nav id="admin-mobile-menu" aria-label="Admin navigation" className="mt-3 space-y-1">
          {NAV_ITEMS.map((item) =>
            item.available ? (
              <Link
                key={item.label}
                href={item.href!}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-navy hover:bg-navy/5"
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                aria-disabled="true"
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground/40"
              >
                {item.label}
                <span className="rounded-full bg-gray-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/50">
                  Soon
                </span>
              </div>
            )
          )}
        </nav>
      )}
    </div>
  );
}