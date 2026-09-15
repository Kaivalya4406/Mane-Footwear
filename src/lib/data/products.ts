import { prisma } from "../prisma";
import type { Product, ShoeIconKind } from "../../types";

const PRODUCT_ORDER = [
  "formal-oxford",
  "comfort-sneakers",
  "kids-school-shoes",
  "womens-ballet-flats",
  "leather-loafers",
  "casual-sandals",
  "kids-casual-sneakers",
];

function mapProduct(row: {
  id: string;
  name: string;
  category: string;
  price: string;
  badge: string | null;
  image: string | null;
  iconKind: string;
  description: string;
  isDemo: boolean;
  collectionId: string;
}): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    badge: (row.badge as Product["badge"]) ?? undefined,
    image: row.image ?? undefined,
    iconKind: row.iconKind as ShoeIconKind,
    description: row.description,
    isDemo: true,
    collectionId: row.collectionId,
  };
}

export async function getProducts(): Promise<Product[]> {
  let rows;
  try {
    rows = await prisma.product.findMany();
  } catch (error) {
    console.error("getProducts: database read failed", error);
    throw new Error("We're having trouble loading our products right now.");
  }

  const mapped = rows.map(mapProduct);
  return PRODUCT_ORDER
    .map((id) => mapped.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  let row;
  try {
    row = await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error(`getProductById(${id}): database read failed`, error);
    throw new Error("We're having trouble loading this product right now.");
  }

  return row ? mapProduct(row) : undefined;
}