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
      />
      <AdminProductsList products={products} />
    </>
  );
}