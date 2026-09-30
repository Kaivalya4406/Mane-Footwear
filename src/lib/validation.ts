import { z } from "zod";

// A monetary amount in integer paise that must be strictly greater than zero.
// Use for fields like unitCostInPaise, amountInPaise where a zero or negative
// value would never be legitimate (e.g. a purchase line, an expense amount).
export const positivePaiseSchema = z
  .number()
  .int("Amount must be a whole number of paise.")
  .positive("Amount must be greater than zero.");

// A monetary amount in integer paise that may legitimately be zero.
// Use for fields where zero is a valid business state (e.g. a fully
// discounted line, a zero-value adjustment) but negative values are not.
export const nonNegativePaiseSchema = z
  .number()
  .int("Amount must be a whole number of paise.")
  .nonnegative("Amount cannot be negative.");