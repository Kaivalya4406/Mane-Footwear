"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { formatPrice } from "../../../../lib/formatPrice";

export type ProductFormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  values?: {
    name?: string;
    category?: string;
    price?: string;
    collectionId?: string;
    description?: string;
    badge?: string;
    image?: string;
    iconKind?: string;
    isActive?: boolean;
  };
};

export type CreateProductAction = (
  prevState: ProductFormState,
  formData: FormData
) => Promise<ProductFormState>;

const priceRegex = /^\d+(\.\d{1,2})?$/;

const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120, "Name is too long."),
  category: z.string().trim().min(1, "Category is required.").max(80, "Category is too long."),
  description: z.string().trim().min(1, "Description is required.").max(2000, "Description is too long."),
  collectionId: z.string().trim().min(1, "Please select a collection."),
  badge: z.enum(["New", "Popular"]).optional(),
    image: z
    .string()
    .trim()
    .refine(
      (val) => {
        try {
          const url = new URL(val);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "Image must be a valid http(s) URL." }
    )
    .optional(),
  iconKind: z.enum(["sneaker", "formal", "sandal", "boot", "kids", "leather"], {
    message: "Please select a valid icon.",
  }),
  isActive: z.boolean(),
  price: z
    .string()
    .trim()
    .regex(priceRegex, "Enter a valid price, e.g. 1499 or 1499.50.")
    .transform((val) => Math.round(parseFloat(val) * 100))
    .pipe(
      z.number().int().positive("Price must be greater than zero.").max(10_000_000, "Price is too high.")
    ),
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Duck-typed check rather than importing Prisma's error class directly — this
// project's Prisma 7 "prisma-client" generator setup has repeatedly had
// surprises around exactly what's exported from where, so this avoids
// depending on that and is defensively correct regardless.
function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const rawName = String(formData.get("name") ?? "");
  const rawCategory = String(formData.get("category") ?? "");
  const rawPrice = String(formData.get("price") ?? "");
  const rawCollectionId = String(formData.get("collectionId") ?? "");
  const rawDescription = String(formData.get("description") ?? "");
  const rawBadge = formData.get("badge");
  const rawImage = formData.get("image");
  const rawIconKind = String(formData.get("iconKind") ?? "");
  const isActiveValue = formData.get("isActive") === "on";

  const badgeValue = typeof rawBadge === "string" && rawBadge.trim() !== "" ? rawBadge.trim() : undefined;
  const imageValue = typeof rawImage === "string" && rawImage.trim() !== "" ? rawImage.trim() : undefined;

  const preservedValues = {
    name: rawName,
    category: rawCategory,
    price: rawPrice,
    collectionId: rawCollectionId,
    description: rawDescription,
    badge: badgeValue,
    image: imageValue,
    iconKind: rawIconKind,
    isActive: isActiveValue,
  };

  const parsed = productSchema.safeParse({
    name: rawName,
    category: rawCategory,
    description: rawDescription,
    collectionId: rawCollectionId,
    badge: badgeValue,
    image: imageValue,
    iconKind: rawIconKind,
    isActive: isActiveValue,
    price: rawPrice,
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { fieldErrors, values: preservedValues };
  }

  // Session verification happens AFTER validation but BEFORE any Prisma write —
  // independent of the protected layout's own check, per the security requirement.
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { error: "Not authorized.", values: preservedValues };
  }

  const collection = await prisma.collection.findUnique({
    where: { id: parsed.data.collectionId },
  });

  if (!collection) {
    return {
      fieldErrors: { collectionId: ["Selected collection does not exist."] },
      values: preservedValues,
    };
  }

  const priceInPaise = parsed.data.price;
  const legacyPrice = formatPrice(priceInPaise);
  const base = slugify(parsed.data.name) || "product";
  const MAX_ATTEMPTS = 10;

  let created = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const candidateId = attempt === 0 ? base : `${base}-${attempt + 1}`;
    try {
      created = await prisma.product.create({
        data: {
          id: candidateId,
          name: parsed.data.name,
          category: parsed.data.category,
          price: legacyPrice,
          priceInPaise,
          badge: parsed.data.badge,
          image: parsed.data.image,
          iconKind: parsed.data.iconKind,
          description: parsed.data.description,
          isDemo: false,
          isActive: parsed.data.isActive,
          collectionId: parsed.data.collectionId,
          brandId: null,
        },
      });
      break;
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        continue; // id collision — try the next suffix
      }
      console.error("createProduct: database write failed", error);
      return {
        error: "Something went wrong while creating the product. Please try again.",
        values: preservedValues,
      };
    }
  }

  if (!created) {
    return {
      error: "Could not generate a unique product ID. Please try a different name.",
      values: preservedValues,
    };
  }

  // redirect() throws internally — it must sit here, outside any try/catch,
  // never inside the catch block above.
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/collections");
  redirect("/admin/products");
}