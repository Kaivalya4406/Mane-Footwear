import { prisma } from "../prisma";
import { generateId } from "../id";

export async function getSupplierPayments() {
  try {
    return await prisma.supplierPayment.findMany({
      orderBy: { paidAt: "desc" },
    });
  } catch (error) {
    console.error("getSupplierPayments: database read failed", error);
    throw error;
  }
}

export async function getSupplierPaymentsBySupplierId(supplierId: string) {
  try {
    return await prisma.supplierPayment.findMany({
      where: { supplierId },
      orderBy: { paidAt: "desc" },
    });
  } catch (error) {
    console.error(
      `getSupplierPaymentsBySupplierId(${supplierId}): database read failed`,
      error
    );
    throw error;
  }
}

export type CreateSupplierPaymentInput = {
  supplierId: string;
  purchaseBillId?: string;
  paymentAccountId: string;
  amountInPaise: number;
  paidAt: Date;
  notes?: string;
};

export async function createSupplierPayment(input: CreateSupplierPaymentInput) {
  try {
    if (input.purchaseBillId) {
      const bill = await prisma.purchaseBill.findUnique({
        where: { id: input.purchaseBillId },
      });

      if (!bill) {
        throw new Error(`Purchase bill ${input.purchaseBillId} does not exist.`);
      }

      if (bill.supplierId !== input.supplierId) {
        throw new Error(
          `Purchase bill ${input.purchaseBillId} does not belong to supplier ${input.supplierId}.`
        );
      }
    }

    return await prisma.supplierPayment.create({
      data: {
        id: generateId(),
        supplierId: input.supplierId,
        purchaseBillId: input.purchaseBillId,
        paymentAccountId: input.paymentAccountId,
        amountInPaise: input.amountInPaise,
        paidAt: input.paidAt,
        notes: input.notes,
      },
    });
  } catch (error) {
    console.error("createSupplierPayment: database write failed", error);
    throw error;
  }
}