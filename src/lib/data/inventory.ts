import { prisma } from "../prisma";

// These reads are for DISPLAY and HISTORY only. They must never be used as the
// authoritative stock check for a sale or any other stock-changing operation.
// Those operations must lock the ProductVariant row and re-read Inventory
// inside their own transaction.
//
// Inventory and StockMovement rows contain cost data. Import these functions
// only from admin routes, never from public storefront code.

export async function getAllInventory() {
  try {
    return await prisma.inventory.findMany({
      include: {
        productVariant: {
          include: { product: { select: { id: true, name: true } } },
        },
      },
      orderBy: [
        { productVariant: { product: { name: "asc" } } },
        { productVariant: { createdAt: "asc" } },
      ],
    });
  } catch (error) {
    console.error("getAllInventory: database read failed", error);
    throw error;
  }
}


export async function getInventoryByVariantId(id: string) {
  try {
    return await prisma.inventory.findUnique({
      where: { productVariantId: id },
      include: {
        productVariant: {
          include: {
            product: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(
      `getInventoryByVariantId(${id}): database read failed`,
      error
    );
    throw error;
  }
}

export async function getStockMovementsByVariantId(id: string) {
  try {
    return await prisma.stockMovement.findMany({
      where: { productVariantId: id },
      orderBy: { createdAt: "desc" },
      include: {
        productVariant: {
          include: {
            product: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(
      `getStockMovementsByVariantId(${id}): database read failed`,
      error
    );
    throw error;
  }
}
