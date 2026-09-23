import { notFound } from "next/navigation";
import AdminPageHeader from "../../../../../../components/admin/AdminPageHeader";
import ProductForm from "../../../../../../components/admin/ProductForm";
import { getCollections } from "../../../../../../lib/data/collections";
import { getProductByIdForAdmin } from "../../../../../../lib/data/products";
import { updateProduct } from "../../actions";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, collections] = await Promise.all([
    getProductByIdForAdmin(id),
    getCollections(),
  ]);

  if (!product) {
    notFound();
  }

  const boundUpdateProduct = updateProduct.bind(null, id);
  const priceValue = (product.priceInPaise / 100).toFixed(2).replace(/\.00$/, "");

  return (
    <>
      <AdminPageHeader title="Edit Product" description={`Editing "${product.name}".`} />
      <ProductForm
        action={boundUpdateProduct}
        collections={collections}
        mode="edit"
        initialValues={{
          name: product.name,
          category: product.category,
          price: priceValue,
          collectionId: product.collectionId,
          description: product.description,
          badge: product.badge,
          image: product.image,
          iconKind: product.iconKind,
          isActive: product.isActive,
        }}
      />
    </>
  );
}