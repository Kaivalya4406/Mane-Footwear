import Link from "next/link";
import Wordmark from "../shared/Wordmark";

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

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-light bg-white md:flex md:flex-col">
      <div className="border-b border-gray-light px-6 py-5">
        <Wordmark className="text-base text-navy" />
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-foreground/50">
          Admin
        </p>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) =>
          item.available ? (
            <Link
              key={item.label}
              href={item.href!}
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
    </aside>
  );
}