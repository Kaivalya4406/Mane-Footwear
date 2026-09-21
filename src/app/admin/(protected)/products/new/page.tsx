import AdminPageHeader from "../../../../../components/admin/AdminPageHeader";
import ProductForm from "../../../../../components/admin/ProductForm";
import { getCollections } from "../../../../../lib/data/collections";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const collections = await getCollections();

  return (
    <>
      <AdminPageHeader title="Add Product" description="Create a new MANE FOOTWEAR product." />
      <ProductForm action={createProduct} collections={collections} />
    </>
  );
}