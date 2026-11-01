const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const countFormatter = new Intl.NumberFormat("en-US");

/** Format a whole-dollar price, e.g. 299 → "$299". */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

/** Format a count with thousands separators, e.g. 1240 → "1,240". */
export function formatCount(value: number): string {
  return countFormatter.format(value);
}
