export function formatPrice(price) {
  return `₹${Math.round(price).toLocaleString('en-IN')}`
}

export function debounce(callback, delay) {
  let timeoutId

  function debounced(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), delay)
  }

  return debounced
}