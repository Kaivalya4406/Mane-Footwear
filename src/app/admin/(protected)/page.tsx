import Link from "next/link";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import AdminStatCard from "../../../components/admin/AdminStatCard";
import { getProducts } from "../../../lib/data/products";
import { getCollections } from "../../../lib/data/collections";
import { getBranches } from "../../../lib/data/branches";

export default async function AdminPage() {
  const [products, collections, branches] = await Promise.all([
    getProducts(),
    getCollections(),
    getBranches(),
  ]);

  const categoryCount = new Set(products.map((product) => product.category)).size;

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Overview of your MANE FOOTWEAR store." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Products"
          value={products.length}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16c0-1.5 1-2.5 2.5-3l6-2.5 3.5-3.5c.8-.8 1.8-1 3-1h2c1.7 0 3 1.3 3 3v3.5c0 1 .4 1.7 1 2v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.5Z" />
            </svg>
          }
        />
        <AdminStatCard
          label="Collections"
          value={collections.length}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
              <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
              <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
              <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
            </svg>
          }
        />
        <AdminStatCard
          label="Branches"
          value={branches.length}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.2" />
            </svg>
          }
        />
      </div>

      <section className="mt-8 rounded-lg border border-gray-light bg-white p-6">
        <h2 className="text-base font-semibold text-navy">Store Overview</h2>
        <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-foreground/60">Products listed</dt>
            <dd className="mt-0.5 font-semibold text-navy">{products.length}</dd>
          </div>
          <div>
            <dt className="text-foreground/60">Collections</dt>
            <dd className="mt-0.5 font-semibold text-navy">{collections.length}</dd>
          </div>
          <div>
            <dt className="text-foreground/60">Branches</dt>
            <dd className="mt-0.5 font-semibold text-navy">{branches.length}</dd>
          </div>
          <div>
            <dt className="text-foreground/60">Categories represented</dt>
            <dd className="mt-0.5 font-semibold text-navy">{categoryCount}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-8 rounded-lg border border-dashed border-gray-light bg-white p-6">
        <h2 className="text-base font-semibold text-navy">Sales &amp; Orders</h2>
        <p className="mt-2 text-sm text-foreground/60">
          Sales and order analytics will appear here once order management is added.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-navy">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-offwhite"
          >
            View Collections
          </Link>
          <Link
            href="/branches"
            className="inline-flex items-center justify-center rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-offwhite"
          >
            View Branches
          </Link>
        </div>
      </section>
    </>
  );
}
