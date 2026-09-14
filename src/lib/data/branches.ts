import { branches } from "../../data/branches";
import type { Branch } from "../../types";

export function getBranches(): Branch[] {
  return branches;
}