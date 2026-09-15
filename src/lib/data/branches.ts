import { prisma } from "../prisma";
import type { Branch } from "../../types";

const BRANCH_ORDER = ["surabhi-footwear", "mane-shoes-leather", "bata-vihan-shoes"];

function mapBranch(row: {
  id: string;
  name: string;
  yearsOfService: string;
  location: string;
  mapsQuery: string;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  hours: string | null;
  image: string | null;
}): Branch {
  return {
    id: row.id,
    name: row.name,
    yearsOfService: row.yearsOfService,
    location: row.location,
    mapsQuery: row.mapsQuery,
    address: row.address ?? undefined,
    phone: row.phone ?? undefined,
    whatsapp: row.whatsapp ?? undefined,
    hours: row.hours ?? undefined,
    image: row.image ?? undefined,
  };
}

export async function getBranches(): Promise<Branch[]> {
  let rows;
  try {
    rows = await prisma.branch.findMany();
  } catch (error) {
    console.error("getBranches: database read failed", error);
    throw new Error("We're having trouble loading our store locations right now.");
  }

  const mapped = rows.map(mapBranch);
  return BRANCH_ORDER
    .map((id) => mapped.find((branch) => branch.id === id))
    .filter((branch): branch is Branch => Boolean(branch));
}