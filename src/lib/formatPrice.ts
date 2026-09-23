export function formatPrice(priceInPaise: number): string {
  const rupees = priceInPaise / 100;
  const isWhole = Number.isInteger(rupees);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  }).format(rupees);
}