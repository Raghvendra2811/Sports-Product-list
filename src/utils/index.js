export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}
