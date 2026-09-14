import { products } from "../../data/product";
import type { Product } from "../../types";

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}