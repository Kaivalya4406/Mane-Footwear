import { prisma } from "../prisma";
import { generateId } from "../id";
import type { PaymentAccountType } from "../../generated/prisma/client";

export async function getPaymentAccounts() {
  try {
    return await prisma.paymentAccount.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("getPaymentAccounts: database read failed", error);
    throw error;
  }
}

export async function getPaymentAccountById(id: string) {
  try {
    return await prisma.paymentAccount.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`getPaymentAccountById(${id}): database read failed`, error);
    throw error;
  }
}

export async function createPaymentAccount(input: {
  name: string;
  type: PaymentAccountType;
  openingBalanceInPaise: number;
}) {
  try {
    return await prisma.paymentAccount.create({
      data: {
        id: generateId(),
        name: input.name,
        type: input.type,
        openingBalanceInPaise: input.openingBalanceInPaise,
      },
    });
  } catch (error) {
    console.error("createPaymentAccount: database write failed", error);
    throw error;
  }
}

export async function updatePaymentAccount(
  id: string,
  input: {
    name: string;
    type: PaymentAccountType;
    openingBalanceInPaise: number;
  }
) {
  try {
    return await prisma.paymentAccount.update({
      where: { id },
      data: {
        name: input.name,
        type: input.type,
        openingBalanceInPaise: input.openingBalanceInPaise,
      },
    });
  } catch (error) {
    console.error(`updatePaymentAccount(${id}): database write failed`, error);
    throw error;
  }
}

export async function deactivatePaymentAccount(id: string) {
  try {
    return await prisma.paymentAccount.update({
      where: { id },
      data: { isActive: false },
    });
  } catch (error) {
    console.error(`deactivatePaymentAccount(${id}): database write failed`, error);
    throw error;
  }
}
