"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { Collection } from "../../types";
import type { ProductFormState, CreateProductAction, UpdateProductAction } from "../../app/admin/(protected)/products/actions";

const ICON_KIND_OPTIONS = [
  { value: "sneaker", label: "Sneaker" },
  { value: "formal", label: "Formal" },
  { value: "sandal", label: "Sandal" },
  { value: "boot", label: "Boot" },
  { value: "kids", label: "Kids" },
  { value: "leather", label: "Leather" },
];

const initialState: ProductFormState = {};

const inputClass =
  "mt-1.5 w-full rounded-md border border-gray-light bg-white px-4 py-2.5 text-sm text-navy focus:outline-none";

function Field({
  label,
  htmlFor,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error && error.length > 0 && <p className="mt-1 text-xs font-medium text-red-600">{error[0]}</p>}
    </div>
  );
}

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();
  const idleLabel = mode === "edit" ? "Save Changes" : "Create Product";
  const pendingLabel = mode === "edit" ? "Saving..." : "Creating...";
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}

type ProductFormValues = NonNullable<ProductFormState["values"]>;

export default function ProductForm({
  action,
  collections,
  initialValues,
  mode = "create",
}: {
  action: CreateProductAction | UpdateProductAction;
  collections: Collection[];
  initialValues?: ProductFormValues;
  mode?: "create" | "edit";
}) {
  const [state, formAction] = useActionState(action as CreateProductAction, initialState);

  // Server-returned values (after a failed submission) take precedence over
  // the original initialValues, so the admin doesn't lose what they typed.
  const values = state.values ?? initialValues ?? {};

  return (
    <div>
      <Link href="/admin/products" className="text-sm font-medium text-navy hover:underline">
        ← Back to Products
      </Link>

      <form action={formAction} className="mt-6 max-w-3xl space-y-6">
        {state.error && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {state.error}
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" error={state.fieldErrors?.name}>
            <input id="name" name="name" type="text" defaultValue={values.name} required className={inputClass} />
          </Field>

          <Field label="Category" htmlFor="category" error={state.fieldErrors?.category}>
            <input id="category" name="category" type="text" defaultValue={values.category} required className={inputClass} />
          </Field>

          <Field label="Price (₹)" htmlFor="price" error={state.fieldErrors?.price}>
            <input
              id="price"
              name="price"
              type="text"
              inputMode="decimal"
              placeholder="1499 or 1499.50"
              defaultValue={values.price}
              required
              className={inputClass}
            />
          </Field>

          <Field label="Collection" htmlFor="collectionId" error={state.fieldErrors?.collectionId}>
            <select id="collectionId" name="collectionId" defaultValue={values.collectionId ?? ""} required className={inputClass}>
              <option value="" disabled>Select a collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>{collection.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Icon" htmlFor="iconKind" error={state.fieldErrors?.iconKind}>
            <select id="iconKind" name="iconKind" defaultValue={values.iconKind ?? ""} required className={inputClass}>
              <option value="" disabled>Select an icon</option>
              {ICON_KIND_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Badge (optional)" htmlFor="badge" error={state.fieldErrors?.badge}>
            <select id="badge" name="badge" defaultValue={values.badge ?? ""} className={inputClass}>
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
            </select>
          </Field>

          <Field label="Image URL (optional)" htmlFor="image" error={state.fieldErrors?.image} className="sm:col-span-2">
            <input id="image" name="image" type="text" placeholder="https://..." defaultValue={values.image} className={inputClass} />
          </Field>

          <Field label="Description" htmlFor="description" error={state.fieldErrors?.description} className="sm:col-span-2">
            <textarea id="description" name="description" rows={4} defaultValue={values.description} required className={inputClass} />
          </Field>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            defaultChecked={values.isActive ?? true}
            className="h-4 w-4 rounded border-gray-light text-navy focus:outline-none"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-navy">
            Visible on storefront (active)
          </label>
        </div>

        <div className="flex items-center gap-4">
          <SubmitButton mode={mode} />
          <Link href="/admin/products" className="text-sm font-medium text-navy hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
