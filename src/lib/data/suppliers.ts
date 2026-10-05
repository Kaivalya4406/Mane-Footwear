import { prisma } from "../prisma";
import { generateId } from "../id";

export async function getSuppliers() {
  try {
    return await prisma.supplier.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("getSuppliers: database read failed", error);
    throw error;
  }
}

export async function getSupplierById(id: string) {
  try {
    return await prisma.supplier.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`getSupplierById(${id}): database read failed`, error);
    throw error;
  }
}

export async function createSupplier(input: {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}) {
  try {
    return await prisma.supplier.create({
      data: {
        id: generateId(),
        name: input.name,
        phone: input.phone,
        email: input.email,
        address: input.address,
        notes: input.notes,
      },
    });
  } catch (error) {
    console.error("createSupplier: database write failed", error);
    throw error;
  }
}

export async function updateSupplier(
  id: string,
  input: {
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    notes?: string;
  }
) {
  try {
    return await prisma.supplier.update({
      where: { id },
      data: {
        name: input.name,
        phone: input.phone,
        email: input.email,
        address: input.address,
        notes: input.notes,
      },
    });
  } catch (error) {
    console.error(`updateSupplier(${id}): database write failed`, error);
    throw error;
  }
}

export async function deactivateSupplier(id: string) {
  try {
    return await prisma.supplier.update({
      where: { id },
      data: { isActive: false },
    });
  } catch (error) {
    console.error(`deactivateSupplier(${id}): database write failed`, error);
    throw error;
  }
}
