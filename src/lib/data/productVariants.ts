import { prisma } from "../prisma";
import { generateId } from "../id";

export async function getVariantsByProductId(productId: string) {
  try {
    return await prisma.productVariant.findMany({
      where: { productId },
    });
  } catch (error) {
    console.error(`getVariantsByProductId(${productId}): database read failed`, error);
    throw error;
  }
}

export async function getVariantById(id: string) {
  try {
    return await prisma.productVariant.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`getVariantById(${id}): database read failed`, error);
    throw error;
  }
}

export async function createVariant(input: {
  productId: string;
  size: string;
  sku?: string;
  priceInPaise: number;
}) {
  try {
    return await prisma.productVariant.create({
      data: {
        id: generateId(),
        productId: input.productId,
        size: input.size,
        sku: input.sku,
        priceInPaise: input.priceInPaise,
      },
    });
  } catch (error) {
    console.error("createVariant: database write failed", error);
    throw error;
  }
}

export async function updateVariant(
  id: string,
  input: {
    size: string;
    sku?: string;
    priceInPaise: number;
  }
) {
  try {
    return await prisma.productVariant.update({
      where: { id },
      data: {
        size: input.size,
        sku: input.sku,
        priceInPaise: input.priceInPaise,
      },
    });
  } catch (error) {
    console.error(`updateVariant(${id}): database write failed`, error);
    throw error;
  }
}

export async function deactivateVariant(id: string) {
  try {
    return await prisma.productVariant.update({
      where: { id },
      data: { isActive: false },
    });
  } catch (error) {
    console.error(`deactivateVariant(${id}): database write failed`, error);
    throw error;
  }
}
