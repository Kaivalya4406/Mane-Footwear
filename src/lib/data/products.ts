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
  priceInPaise: number;
  badge: string | null;
  image: string | null;
  iconKind: string;
  description: string;
  isDemo: boolean;
  isActive: boolean;
  collectionId: string;
  createdAt: Date;
}): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    priceInPaise: row.priceInPaise,
    badge: (row.badge as Product["badge"]) ?? undefined,
    image: row.image ?? undefined,
    iconKind: row.iconKind as ShoeIconKind,
    description: row.description,
    isDemo: row.isDemo,
    isActive: row.isActive,
    collectionId: row.collectionId,
  };
}

export async function getProducts(): Promise<Product[]> {
  let rows;
  try {
    rows = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("getProducts: database read failed", error);
    throw new Error("We're having trouble loading our products right now.");
  }

  const mapped = rows.map(mapProduct);

  const ordered = PRODUCT_ORDER
    .map((id) => mapped.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  const orderedIds = new Set(ordered.map((product) => product.id));
  const extras = mapped.filter((product) => !orderedIds.has(product.id));

  return [...ordered, ...extras];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  let row;
  try {
    row = await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error(`getProductById(${id}): database read failed`, error);
    throw new Error("We're having trouble loading this product right now.");
  }

  if (!row || !row.isActive) {
    return undefined;
  }

  return mapProduct(row);
}

export async function getAllProductsForAdmin(): Promise<Product[]> {
  let rows;
  try {
    rows = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  } catch (error) {
    console.error("getAllProductsForAdmin: database read failed", error);
    throw new Error("We're having trouble loading the product catalogue right now.");
  }

  return rows.map(mapProduct);
}