import { prisma } from "../prisma";
import type { Collection, ShoeIconKind } from "../../types";

const COLLECTION_ORDER = ["mens", "womens", "kids", "school", "sports", "leather"];

function mapCollection(row: {
  id: string;
  name: string;
  description: string;
  iconKind: string;
}): Collection {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    iconKind: row.iconKind as ShoeIconKind,
    href: `/collections?category=${row.id}`,
  };
}

export async function getCollections(): Promise<Collection[]> {
  const rows = await prisma.collection.findMany();
  const mapped = rows.map(mapCollection);
  return COLLECTION_ORDER
    .map((id) => mapped.find((collection) => collection.id === id))
    .filter((collection): collection is Collection => Boolean(collection));
}