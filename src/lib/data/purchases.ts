import { prisma } from "../prisma";
import { generateId } from "../id";
import { StockMovementReason, PurchasePaymentStatus } from "../../generated/prisma/client";

export type CreatePurchaseBillInput = {
  supplierId: string;
  billNumber: string;
  billDate: Date;
  documentUrl?: string;
  paymentStatus: PurchasePaymentStatus;
  notes?: string;
  items: {
    productVariantId: string;
    quantity: number;
    unitCostInPaise: number;
  }[];
};

// Primitive shape/range validation (quantity > 0, unitCostInPaise > 0, etc.)
// is expected to already have been performed by the calling Server Action's
// Zod schema before this function is invoked. This function performs only
// the structural and business checks that are specific to this operation or
// that genuinely require database access.
export async function createPurchaseBill(input: CreatePurchaseBillInput) {
  if (input.items.length === 0) {
    throw new Error("A purchase bill must include at least one item.");
  }

  const seenVariantIds = new Set<string>();
  for (const item of input.items) {
    if (seenVariantIds.has(item.productVariantId)) {
      throw new Error(
        `This purchase bill already has a line for this exact size (variant ${item.productVariantId}). Combine the quantities into one line instead.`
      );
    }
    seenVariantIds.add(item.productVariantId);
  }

  // Compute totals server-side; never trust a caller-supplied total.
  const itemsWithTotals = input.items.map((item) => ({
    ...item,
    totalCostInPaise: item.quantity * item.unitCostInPaise,
  }));
  const billTotalInPaise = itemsWithTotals.reduce(
    (sum, item) => sum + item.totalCostInPaise,
    0
  );

  // Process variants in a fixed, deterministic order so that two concurrent
  // purchase bills touching overlapping variants always request their row
  // locks in the same order, which makes a deadlock between them impossible.
  const sortedItems = [...itemsWithTotals].sort((a, b) =>
    a.productVariantId.localeCompare(b.productVariantId)
  );

  try {
    return await prisma.$transaction(async (tx) => {
      const supplier = await tx.supplier.findUnique({
        where: { id: input.supplierId },
      });

      if (!supplier) {
        throw new Error(`Supplier ${input.supplierId} does not exist.`);
      }

      const bill = await tx.purchaseBill.create({
        data: {
          id: generateId(),
          supplierId: input.supplierId,
          billNumber: input.billNumber,
          billDate: input.billDate,
          billTotalInPaise,
          documentUrl: input.documentUrl,
          paymentStatus: input.paymentStatus,
          notes: input.notes,
        },
      });

      // Each line is processed strictly one at a time - never in parallel.
      // This is required both for correctness (a variant's lock must be
      // fully used and released in order) and to avoid a known issue in
      // @prisma/adapter-pg 7.10.0 where concurrent queries inside one
      // interactive transaction can return mismatched results if one fails.
      for (const item of sortedItems) {
        const lockedVariantRows = await tx.$queryRaw<
          { id: string; isActive: boolean }[]
        >`SELECT "id", "isActive" FROM "ProductVariant" WHERE "id" = ${item.productVariantId} FOR UPDATE`;

        const lockedVariant = lockedVariantRows[0];

        if (!lockedVariant) {
          throw new Error(`Product variant ${item.productVariantId} does not exist.`);
        }

        if (!lockedVariant.isActive) {
          throw new Error(
            `Product variant ${item.productVariantId} is inactive and cannot be purchased.`
          );
        }

        const existingInventory = await tx.inventory.findUnique({
          where: { productVariantId: item.productVariantId },
        });

        if (existingInventory) {
          const newQuantity = existingInventory.quantity + item.quantity;
          const newAverageCostInPaise = Math.round(
            (existingInventory.quantity * existingInventory.averageCostInPaise +
              item.quantity * item.unitCostInPaise) /
              newQuantity
          );

          await tx.inventory.update({
            where: { productVariantId: item.productVariantId },
            data: {
              quantity: newQuantity,
              averageCostInPaise: newAverageCostInPaise,
            },
          });
        } else {
          await tx.inventory.create({
            data: {
              id: generateId(),
              productVariantId: item.productVariantId,
              quantity: item.quantity,
              averageCostInPaise: item.unitCostInPaise,
            },
          });
        }

        await tx.stockMovement.create({
          data: {
            id: generateId(),
            productVariantId: item.productVariantId,
            quantityChange: item.quantity,
            reason: StockMovementReason.PURCHASE,
            costInPaiseAtMovement: item.unitCostInPaise,
          },
        });

        await tx.purchaseItem.create({
          data: {
            id: generateId(),
            purchaseBillId: bill.id,
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            unitCostInPaise: item.unitCostInPaise,
            totalCostInPaise: item.totalCostInPaise,
          },
        });
      }

      return bill;
    });
  } catch (error) {
    console.error("createPurchaseBill: transaction failed", error);
    throw error;
  }
}

export async function getPurchaseBills() {
  try {
    return await prisma.purchaseBill.findMany({
      include: { supplier: true },
      orderBy: [{ billDate: "desc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("getPurchaseBills: database read failed", error);
    throw error;
  }
}

export async function getPurchaseBillById(id: string) {
  try {
    return await prisma.purchaseBill.findUnique({
      where: { id },
      include: {
        supplier: true,
        purchaseItems: {
          orderBy: [
            { productVariant: { product: { name: "asc" } } },
            { productVariant: { createdAt: "asc" } },
          ],
          include: {
            productVariant: {
              include: { product: { select: { id: true, name: true } } },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(`getPurchaseBillById(${id}): database read failed`, error);
    throw error;
  }
}

export async function getPurchaseBillsBySupplierId(supplierId: string) {
  try {
    return await prisma.purchaseBill.findMany({
      where: { supplierId },
      orderBy: [{ billDate: "desc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error(
      `getPurchaseBillsBySupplierId(${supplierId}): database read failed`,
      error
    );
    throw error;
  }
}
