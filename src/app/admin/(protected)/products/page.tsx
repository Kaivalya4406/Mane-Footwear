import Link from "next/link";
import AdminPageHeader from "../../../../components/admin/AdminPageHeader";
import AdminProductsList from "../../../../components/admin/AdminProductsList";
import { getAllProductsForAdmin } from "../../../../lib/data/products";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <>
      <AdminPageHeader
        title="Products"
        description="All products in your MANE FOOTWEAR catalogue."
        action={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-orange-dark"
          >
            Add Product
          </Link>
        }
      />
      <AdminProductsList products={products} />
    </>
  );
}