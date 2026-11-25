const BASE_URL = 'https://6b06f7a757fa1297bb568079.mockapi.io'

const PRODUCT_URL = `${BASE_URL}/Products`
const CART_URL = `${BASE_URL}/Cart`

async function readResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getProducts(setProducts) {
  const response = await fetch(PRODUCT_URL)
  const products = await readResponse(response)
  setProducts(products)
}

export async function getCart(setCartItems) {
  const response = await fetch(CART_URL)
  const cartItems = await readResponse(response)
  setCartItems(cartItems)
}

export async function addToCart(item) {
  const response = await fetch(CART_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  return readResponse(response)
}

export async function updateCartItem(itemId, updates) {
  const response = await fetch(`${CART_URL}/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  return readResponse(response)
}

export async function removeFromCart(itemId) {
  const response = await fetch(`${CART_URL}/${itemId}`, {
    method: 'DELETE',
  })

  return readResponse(response)
}

